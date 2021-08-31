<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Request as UserRequest;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Inventory;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;
use App\Entity\Category;
use App\Entity\Role;
use App\Entity\User;
use DateTime;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class MainController extends AbstractController
{   
    // User
     /**
     * @Route("/api/users", name="get_users", methods={"GET"})
     */
    public function getUsers()
    {
  
        $users = $this->getDoctrine()
                    ->getRepository(User::class)
                    ->findAll();
        if(empty($users)){
            $response = array(
                'code' => 404,
                'message' => 'No users',
                'errors' => null,
                'result' => null
            );
            return new JsonResponse($response, 404);
        }

        // $data = $serializer->serialize($inventory, 'json', [AbstractNormalizer::IGNORED_ATTRIBUTES => ['category']]); // Ignore attributes
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
            'message' => 'Success',
            'errors' => null,
            'result' => json_decode($data)
        );
            return new JsonResponse($response, 200);
    }
    
    /**
    * @Route("/api/users/{id}", name="get_user", methods={"GET"}, requirements={"id"="\d+"})
    */
    public function showUser($id, Request $request){
            $user = $this->getDoctrine()
                             ->getRepository(User::class)
                             ->find($id);
                             
             if(empty($user)){
                 $response = array(
                     'code' => 404,
                     'message' => 'No posts',
                     'errors' => null,
                     'result' => null
                 );  
                 return new JsonResponse($response, 404);           
             } 
             // $data = $serializer->serialize($inventory, 'json', [AbstractNormalizer::IGNORED_ATTRIBUTES => ['category']]); // Ignore attributes
             $encoders = [new JsonEncoder()];
             $defaultContext = [
                 AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object, $format, $context) {
                     return $object->getFullName();
                 },
                 AbstractNormalizer::IGNORED_ATTRIBUTES => ['role']
             ];
             $normalizers = [new ObjectNormalizer(null, null, null, null, null, null, $defaultContext)];
 
             $serializer = new Serializer($normalizers, $encoders);
             $data = $serializer->serialize($user, 'json');
 
 
             $response = array(
                 'code' => 200,
                 'message' => 'Sucess',
                 'errors' => null,
                 'result' => json_decode($data)
             );
             return new JsonResponse($response, 200);
    }

    // Remove user
     /**
    * @Route("/api/users/remove/{id}", name="remove_user", methods={"PUT"}, requirements={"id"="\d+"})
    */
    public function removeUser($id, Request $request){
        $user = $this->getDoctrine()
                         ->getRepository(User::class)
                         ->find($id);
                         
         if(empty($user)){
             $response = array(
                 'code' => 404,
                 'message' => 'No posts',
                 'errors' => null,
                 'result' => null
             );  
             return new JsonResponse($response, 404);           
         } 
        
         $user->setStatus("left");
         $user->setLeftAt(new DateTime('NOW'));
         $em = $this->getDoctrine()->getManager();
         $em->persist($user);
         $em->flush();


         $response = array(
             'code' => 200,
             'message' => 'User removed',
             'errors' => null,
             'result' => null
         );
         return new JsonResponse($response, 200);

    
        }


    // Revive user
     /**
    * @Route("/api/users/revive/{id}", name="revive_user", methods={"PUT"}, requirements={"id"="\d+"})
    */
    public function reviveUser($id, Request $request){
        $user = $this->getDoctrine()
                         ->getRepository(User::class)
                         ->find($id);
                         
         if(empty($user)){
             $response = array(
                 'code' => 404,
                 'message' => 'No posts',
                 'errors' => null,
                 'result' => null
             );  
             return new JsonResponse($response, 404);           
         } 
        
         $user->setStatus("new");
         $user->removeLeftAt();
         $em = $this->getDoctrine()->getManager();
         $em->persist($user);
         $em->flush();


         $response = array(
             'code' => 200,
             'message' => 'User revived',
             'errors' => null,
             'result' => null
         );
         return new JsonResponse($response, 200); 
        }
}