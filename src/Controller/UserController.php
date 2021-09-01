<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class UserController extends AbstractController
{
    /**
     * @Route("/api/admin/users", name="create_user", methods={"POST"})
     */
    public function createUser(Request $request, UserPasswordHasherInterface $encoder)
    {
        // Check if current user is admin
        $roles = $this->getUser()->getRoles();
        $designation = $this->getUser()->getDesignation();
        if(in_array('ROLE_ADMIN', $roles) || $designation === 'CEO'){
            $user = new User();
            $parameters = json_decode($request->getContent(), true);
            $user->setEmail($parameters['email']);
            $user->setPassword($encoder->hashPassword($user, $parameters['password']));
            $user->setFullName($parameters['fullName']);
            $user->setCreatedAt(new \DateTimeImmutable('NOW'));
            $joinDate = new \DateTime(); 
            $joinDate->createFromFormat('j-M-Y', $parameters['joinedAt']);
            $user->setJoinedAt($joinDate);
            $user->setStatus('active');
            $parameters['designation'] !== 'CEO' ?
                $user->setDesignation($parameters['designation']) :
                $user->setDesignation('employee');
            if($designation === 'CEO') {
                !empty($parameters['role']) ? 
                    $user->setRoles([$parameters['role']]) : 
                    $user->setRoles(['ROLE_USER']);
            } else {
                $user->setRoles(['ROLE_USER']);
            }
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();
            $response = array(
                'code' => 200,
                'errors' => null,
                'result' => null
            );
            return new JsonResponse($response, 200);
        }
        $response = array(
            'code' => 401,
            'errors' => 'unauthorized',
            'result' => null
        );
        return new JsonResponse($response, 401);  
    }

    /**
     * @Route("/api/admin/users/{id}", name="edit_user", methods={"PUT"})
     */
    public function editUser($id, Request $request)
    {
        // Check if current user is admin
        $roles = $this->getUser()->getRoles();
        $designation = $this->getUser()->getDesignation();
        if(in_array('ROLE_ADMIN', $roles)){
            $user = $this->getDoctrine()->getRepository(User::class)->find($id);
            // check if user is 'CEO'
            if($user->getDesignation() === 'CEO'){
                $response = array(
                    'code' => 401,
                    'errors' => 'unauthorized',
                    'result' => null
                );
                return new JsonResponse($response, 401); 
            }
            $parameters = json_decode($request->getContent(), true);
            $user->setEmail($parameters['email']);
            $user->setFullName($parameters['fullName']);
            $user->setCreatedAt(new \DateTimeImmutable('NOW'));
            $joinDate = new \DateTime(); 
            $joinDate->createFromFormat('j-M-Y', $parameters['joinedAt']);
            $user->setJoinedAt($joinDate);
            $user->setStatus('active');
            $parameters['designation'] !== 'CEO' ?
                $user->setDesignation($parameters['designation']) :
                $user->setDesignation('employee');
            if($designation === 'CEO') {
                !empty($parameters['role']) ? 
                    $user->setRoles([$parameters['role']]) : 
                    $user->setRoles(['ROLE_USER']);
            } else {
                $user->setRoles(['ROLE_USER']);
            }
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();
            $response = array(
                'code' => 200,
                'errors' => null,
                'result' => null
            );
            return new JsonResponse($response, 200);
        }
        $response = array(
            'code' => 401,
            'errors' => 'unauthorized',
            'result' => null
        );
        return new JsonResponse($response, 401);  
    }

     /**
     * @Route("/api/admin/users", name="get_users", methods={"GET"})
     */
    public function getUsers()
    {
        // Check if current user is admin
        $roles = $this->getUser()->getRoles();
        $designation = $this->getUser()->getDesignation();
        if(in_array('ROLE_ADMIN', $roles)){
            $users = $this->getDoctrine()
                        ->getRepository(User::class)
                        ->findAll();
            if(empty($users)){
                $response = array(
                    'code' => 404,
                    'errors' => 'No users',
                    'result' => null
                );
                return new JsonResponse($response, 404);
            }

            $encoders = [new JsonEncoder()];
            $defaultContext = [
                AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object, $format, $context) {
                    return $object->getFullName();
                },
                AbstractNormalizer::IGNORED_ATTRIBUTES => ['role']
            ];
            $normalizers = [new ObjectNormalizer(null, null, null, null, null, null, $defaultContext)];

            $serializer = new Serializer($normalizers, $encoders);

            $data = $serializer->serialize($users, 'json');
            $response = array(
                'code' => 200,
                'errors' => null,
                'result' => json_decode($data)
            );
            return new JsonResponse($response, 200);
        }
        $response = array(
            'code' => 401,
            'errors' => 'unauthorized',
            'result' => null
        );  
        return new JsonResponse($response, 401);  
    }

    // Remove/Revive user
    /**
    * @Route("/api/admin/users/{id}/{action}", name="remove_user", methods={"PUT"}, requirements={"id"="\d+"})
    */
    public function manageUser($id, $action, Request $request){
        // Check if current user is admin
        $roles = $this->getUser()->getRoles();
        $designation = $this->getUser()->getDesignation();
        if(in_array('ROLE_ADMIN', $roles)){
            $user = $this->getDoctrine()
                            ->getRepository(User::class)
                            ->find($id);
                            
            if(empty($user)){
                $response = array(
                    'code' => 404,
                    'errors' => 'No user',
                    'result' => null
                );  
                return new JsonResponse($response, 404);           
            } 
            if($user->getDesignation() === 'CEO'|| ($action !== 'remove' && $action!=='revive')){
                $response = array(
                    'code' => 404,
                    'errors' => 'Bad request',
                    'result' => null
                );  
                return new JsonResponse($response, 404);  
            }       
            
            if($action === 'remove'){
                $user->setStatus("left");
                $user->setLeftAt(new \DateTime('NOW'));
            } else if($action === 'revive'){
                $user->setStatus("active");
                $user->removeLeftAt();
            }
            
            $em = $this->getDoctrine()->getManager();
            $em->persist($user);
            $em->flush();


            $response = array(
                'code' => 200,
                'errors' => null,
                'result' => null
            );
            return new JsonResponse($response, 200);    
        }
        $response = array(
            'code' => 401,
            'errors' => 'unauthorized',
            'result' => null
        );  
        return new JsonResponse($response, 401);  
    }
}
