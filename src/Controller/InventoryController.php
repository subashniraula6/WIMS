<?php

namespace App\Controller;

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
     * @Route("/api/inventories", name="get_inventories", methods={"GET"})
     */
    public function getInventories()
    {
        $inventories = $this->getDoctrine()
                    ->getRepository(Inventory::class)
                    ->findAll();
        if(empty($inventories)){
            $response = array(
                'code' => 404,
                'message' => 'No inventories',
                'errors' => null,
                'result' => null
            );
            return new JsonResponse($response, 404);
        }
        
        $encoders = [new JsonEncoder()];
        $defaultContext = [
            AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object, $format, $context) {
                return $object->getName();
            },
            // AbstractNormalizer::IGNORED_ATTRIBUTES => ['inventories']
        ];
        $normalizers = [new ObjectNormalizer(null, null, null, null, null, null, $defaultContext)];

        $serializer = new Serializer($normalizers, $encoders);
        $data = $serializer->serialize($inventories, 'json');
        $response = array(
            'code' => 200,
            'message' => 'Success',
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
                        
        if(empty($inventory)){
            $response = array(
                'code' => 404,
                'message' => 'No inventory',
                'errors' => null,
                'result' => null
            );  
            return new JsonResponse($response, 404);           
        } 
        // $data = $serializer->serialize($inventory, 'json', [AbstractNormalizer::IGNORED_ATTRIBUTES => ['category']]); // Ignore attributes
        $encoders = [new JsonEncoder()];
        $defaultContext = [
            AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object, $format, $context) {
                return $object->getName();
            },
            AbstractNormalizer::IGNORED_ATTRIBUTES => ['inventories']
        ];
        $normalizers = [new ObjectNormalizer(null, null, null, null, null, null, $defaultContext)];
        $serializer = new Serializer($normalizers, $encoders);
        $data = $serializer->serialize($inventory, 'json');
        $response = array(
            'code' => 200,
            'message' => 'Sucess',
            'errors' => null,
            'result' => json_decode($data)
        );
        return new JsonResponse($response, 200);
    }

    /**
     * @Route("/api/inventories", name="new_inventory", methods={"POST"})
     */
    public function postNewInventories(Request $request, SerializerInterface $serializer)
    {
            $category = $this->getDoctrine()->getRepository(Category::class)->find(1);

            $body = $request -> getContent();            
            $inventory = $serializer->deserialize($body, Inventory::class, 'json');
            $inventory->setCreatedAt(new DateTime('NOW'));
            
            $inventory->setCategory($category); //

            $em = $this->getDoctrine()->getManager();
            $em -> persist($inventory);

            $em->persist($category);

            $em -> flush();

            $response=array(
                'code'=> 201,
                'message'=>'Inventory created!',
                'errors'=>null,
                'result'=>null
            );
            return new JsonResponse($response, 201);
    }

    /**
     * @Route("/api/inventories/edit/{id}", name="edit_inventory", methods={"PUT"})
     */
    public function editInventory($id, Request $request, SerializerInterface $serializer)
    {
            $entityManager = $this->getDoctrine()->getManager();
                        
            $inventory = $entityManager->getRepository(Inventory::class)
                        ->find($id);

            if(empty($inventory)){
                $response = array(
                    'code' => 404,
                    'message' => 'No Inventory',
                    'errors' => null,
                    'result' => null
                );  
                return new JsonResponse($response, 404);           
            }           
            
            $body = $request->getContent();
            $new_inventory = $serializer->deserialize($body, Inventory::class, 'json');

            $inventory->setName($new_inventory->getName());
            $inventory->setBrand($new_inventory->getBrand());
            $inventory->setCategory($new_inventory->getCategory());
            $inventory->setSubCategory($new_inventory->getSubCategory());
            $inventory->setModel($new_inventory->getModel());
            $inventory->setStatus($new_inventory->getStatus());
            $inventory->setDescription($new_inventory->getDescription());

            $entityManager->flush();

            $response = array(
                'code'=> 200,
                'message'=>'Inventory updated!',
                'errors'=>null,
                'result'=>null
            );
            return new JsonResponse($response, 200); 
    }

    /**
     * @Route("/api/inventories/dispose/{id}", name="dispose_inventory", methods={"PUT"})
     */
    public function deleteInventory($id, Request $request, SerializerInterface $serializer)
    {
            $inventory = $this->getDoctrine()
                        ->getRepository(Inventory::class)
                        ->findOneBy(['id'=> $id]);

            if(empty($inventory)){
                $response = array(
                    'code' => 404,
                    'message' => 'No posts',
                    'errors' => null,
                    'result' => null
                );  
                return new JsonResponse($response, 404);           
            }           
            
            $em = $this->getDoctrine()->getManager();
            $inventory->setStatus("disposed");
            $inventory->setDisposeAt(new \DateTime('NOW'));
            $em->persist($inventory);
            $em->flush();

            $response = array(
                'code'=> 0,
                'message'=>'Inventory disposed!',
                'errors'=>null,
                'result'=>null
            );
            return new JsonResponse($response, 200); 
    }

    /**
     * @Route("/api/inventories/revive/{id}", name="delete_inventory", methods={"PUT"})
     */
    public function reviveInventory($id, Request $request, SerializerInterface $serializer)
    {
            $inventory = $this->getDoctrine()
                        ->getRepository(Inventory::class)
                        ->findOneBy(['id'=> $id]);

            if(empty($inventory)){
                $response = array(
                    'code' => 404,
                    'message' => 'No posts',
                    'errors' => null,
                    'result' => null
                );  
                return new JsonResponse($response, 404);           
            }           
            
            $em = $this->getDoctrine()->getManager();
            $inventory->setStatus("new");
            $inventory->removeDisposeAt();
            $em->persist($inventory);
            $em->flush();

            $response = array(
                'code'=> 0,
                'message'=>'Inventory revived!',
                'errors'=>null,
                'result'=>null
            );
            return new JsonResponse($response, 200); 
    }
}
