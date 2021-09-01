<?php

namespace App\Controller;

use App\Entity\Inventory;
use App\Entity\Servicing;
use App\Entity\User;
use DateInterval;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\SerializerInterface;

class InventoryController extends AbstractController
{
     /**
     * @Route("/api/admin/inventories", name="fetch_All_Inventories", methods={"GET"})
     */
    public function getAllInventories()
    {
        $roles = $this->getUser()->getRoles();
        // Check if current user is admin
        if(in_array('ROLE_ADMIN', $roles)){
            $inventories = $this->getDoctrine()
                        ->getRepository(Inventory::class)
                        ->findAll();
    
            if(empty($inventories)){
                $response = array(
                    'code' => 404,
                    'errors' => 'no inventories',
                    'result' => null
                );
                return new JsonResponse($response, 404);
            }
            
            $encoders = [new JsonEncoder()];
            $defaultContext = [
                AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object, $format, $context) {
                    return $object->getName();
                },
                AbstractNormalizer::ATTRIBUTES => ['name', 'brand', 'model', 'status', 'description', 'category', 'user', 'email', 'fullName']
            ];
            $normalizers = [new ObjectNormalizer(null, null, null, null, null, null, $defaultContext)];
    
            $serializer = new Serializer($normalizers, $encoders);
            $data = $serializer->serialize($inventories, 'json');
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

    /**
     * @Route("/api/inventories", name="fetch_inventories", methods={"GET"})
     */
    public function getInventories()
    {
        $inventories = $this->getUser()->getInventories();
        if(empty($inventories)){
            $response = array(
                'code' => 404,
                'errors' => 'no inventories',
                'result' => null
            );
            return new JsonResponse($response, 404);
        }
        
        $encoders = [new JsonEncoder()];
        $defaultContext = [
            AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object, $format, $context) {
                return $object->getName();
            },
            AbstractNormalizer::ATTRIBUTES => ['name', 'brand', 'model', 'status', 'description', 'category', 'user', 'email', 'fullName']
        ];
        $normalizers = [new ObjectNormalizer(null, null, null, null, null, null, $defaultContext)];

        $serializer = new Serializer($normalizers, $encoders);
        $data = $serializer->serialize($inventories, 'json');
        $response = array(
            'code' => 200,
            'errors' => null,
            'result' => json_decode($data)
        );
            return new JsonResponse($response, 200);
    }
    
    /**
    * @Route("/api/inventories/{id}", name="get_inventory", methods={"GET"}, requirements={"id"="\d+"})
    */
    public function getInventory($id){

        $inventory = $this->getDoctrine()
                        ->getRepository(Inventory::class)
                        ->find($id);
        
        $roles = $this->getUser()->getRoles();
        // Check if current user is admin
        if(in_array('ROLE_ADMIN', $roles) || $inventory->getUser() === $this->getUser()){
            if(empty($inventory)){
                $response = array(
                    'code' => 404,
                    'errors' => 'no inventory',
                    'result' => null
                );  
                return new JsonResponse($response, 404);           
            } 
            $encoders = [new JsonEncoder()];
            $defaultContext = [
                AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object, $format, $context) {
                    return $object->getName();
                },
                AbstractNormalizer::ATTRIBUTES => ['name', 'brand', 'model', 'status', 'description', 'category', 'user', 'email', 'fullName']
            ];
            $normalizers = [new ObjectNormalizer(null, null, null, null, null, null, $defaultContext)];
            $serializer = new Serializer($normalizers, $encoders);
            $data = $serializer->serialize($inventory, 'json');
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

    /**
     * @Route("/api/admin/inventories", name="create_inventory", methods={"POST"})
     */
    public function postNewInventories(Request $request, SerializerInterface $serializer)
    {
        $roles = $this->getUser()->getRoles();
        // Check if current user is admin
        if(in_array('ROLE_ADMIN', $roles)){ 
            $inventory = $serializer->deserialize($request->getContent(), Inventory::class, 'json');
            
            $parameters = json_decode($request -> getContent(), true); 
            $user_email = $parameters['user_email'];

            //Allocating user
            $user = $this->getDoctrine()->getRepository(User::class)->findOneBy(['email' => $user_email]);
            if(empty($user)){
                $response = array(
                    'code' => 404,
                    'errors' => 'user not found!',
                    'result' => null
                );
                return new JsonResponse($response, 404);
            }
            $inventory-> setUser($user);

            $inventory->setCreatedAt(new DateTime('NOW'));
            $inventory->setStatus('new');

            //Adding Servicing
            $servicing_duration = $parameters['servicing_duration'];
            $servicing = new Servicing();
            $servicing->setStatus('not required');
            $servicing->setDurationInMonth($servicing_duration);

            $date = new DateTime('NOW');
            $date->add(new DateInterval('P'.$servicing_duration.'M'));
            dump($date);      
            $servicing->setServiceAt($date); 

            $inventory->setServicing($servicing);
            $em = $this->getDoctrine()->getManager();
            $em -> persist($inventory);

            $em -> flush();

            $response=array(
                'code'=> 201,
                'errors'=>null,
                'result'=>null
            );
            return new JsonResponse($response, 201);
        }
        $response = array(
            'code' => 401,
            'errors' => 'unauthorized',
            'result' => null
        );
        return new JsonResponse($response, 401);
    }

    /**
     * @Route("/api/admin/inventories/{id}", name="edit_inventory", methods={"PUT"})
     */
    public function editInventory($id, Request $request, SerializerInterface $serializer)
    {
        $roles = $this->getUser()->getRoles();
        // Check if current user is admin
        if(in_array('ROLE_ADMIN', $roles)){
            $entityManager = $this->getDoctrine()->getManager();
                        
            $inventory = $entityManager->getRepository(Inventory::class)
                        ->find($id);

            if(empty($inventory)){
                $response = array(
                    'code' => 404,
                    'errors' => 'No Inventory',
                    'result' => null
                );  
                return new JsonResponse($response, 404);           
            }           
            
            $body = $request->getContent();
            $parameters = json_decode($body, true);

            $inventory->setName($parameters['name']);
            !empty($parameters['brand']) ? $inventory->setBrand($parameters['brand']) : null;
            $inventory->setCategory($parameters['category']);
            !empty($parameters['model']) ? $inventory->setModel($parameters['model']) : null;
            !empty($parameters['description']) ? $inventory->setDescription($parameters['description']) : null;

            // change user
            $new_user_email = $parameters['user_email'];
            $new_user = $this->getDoctrine()->getRepository(User::class)->findOneBy(['email' => $new_user_email]);
        
            if($inventory->getUser() !== $new_user){
                $inventory->setUser($new_user);
            }

            $servicing = $inventory->getServicing();
            //add service date
            $addedMonth = $parameters['addedMonth'];
            if($addedMonth !== 0){
                $date = new DateTime('NOW');
                $date->add(new DateInterval('P'.$addedMonth.'M'));
                $servicing->setServiceAt($date); 
                $servicing->setDurationInMonth($addedMonth);
            }
            $entityManager->flush();

            $response = array(
                'code'=> 200,
                'errors'=>null,
                'result'=>null
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
     * @Route("/api/admin/inventories/{id}/dispose", name="dispose_inventory", methods={"PUT"})
     */
    public function deleteInventory($id, Request $request, SerializerInterface $serializer)
    {
        $roles = $this->getUser()->getRoles();
        // Check if current user is admin
        if(in_array('ROLE_ADMIN', $roles)){
            $inventory = $this->getDoctrine()
                        ->getRepository(Inventory::class)
                        ->findOneBy(['id'=> $id]);

            if(empty($inventory)){
                $response = array(
                    'code' => 404,
                    'errors' => 'no inventory',
                    'result' => null
                );  
                return new JsonResponse($response, 404);           
            }           
            
            $em = $this->getDoctrine()->getManager();
            $inventory->setStatus("disposed");
            $inventory->setDisposeAt(new \DateTime('NOW'));

            // chande servicing status
            $inventory->getServicing()->setStatus("disposed");

            $em->persist($inventory);
            $em->flush();

            $response = array(
                'code'=> 0,
                'errors'=>null,
                'result'=>null
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
     * @Route("/api/admin/inventories/{id}/revive", name="delete_inventory", methods={"PUT"})
     */
    public function reviveInventory($id, Request $request, SerializerInterface $serializer)
    {
        $roles = $this->getUser()->getRoles();
        // Check if current user is admin
        if(in_array('ROLE_ADMIN', $roles)){
            $inventory = $this->getDoctrine()
                        ->getRepository(Inventory::class)
                        ->findOneBy(['id'=> $id]);

            if(empty($inventory)){
                $response = array(
                    'code' => 404,
                    'errors' => 'no inventory',
                    'result' => null
                );  
                return new JsonResponse($response, 404);           
            }           
            
            $em = $this->getDoctrine()->getManager();
            $inventory->setStatus("new");
            $inventory->removeDisposeAt();

            // chande servicing status
            $inventory->getServicing()->setStatus("not required");

            $em->persist($inventory);
            $em->flush();

            $response = array(
                'code'=> 0,
                'errors'=>null,
                'result'=>null
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
