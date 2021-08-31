<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Request as UserRequest;
use App\Repository\RequestRepository;
use Normalizer;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\SerializerInterface;

class RequestController extends AbstractController
{

    // admin views all requests
    /**
     * @Route("/api/admin/requests", name="get_all_requests", methods={"GET"})
     */
    public function getAllRequests(RequestRepository $requestRepository)
    {
        $roles = $this->getUser()->getRoles();
        
        // Check if current user is admin
        if(in_array('ROLE_ADMIN', $roles)){
            $requests = $requestRepository->findAll();
            // Check if requests is exists
            if(empty($requests)){
                $response = array(
                    'code' => 404,
                    'errors' => 'No requests found!',
                    'result' => null
                );
                return new JsonResponse($response, 404);  
            }

            // handling circular reference error and ignoring attributes
            $defaultContext = [
                AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function($object, $format, $context)
                {
                    return $object->getType();
                },
                AbstractNormalizer::IGNORED_ATTRIBUTES => ["createdAt", "joinedAt"]
            ];
            $encoders = [new JsonEncoder()];
            $normalizers = [new ObjectNormalizer(null, null, null, null, null, null, $defaultContext)];
            $serializer = new Serializer($normalizers, $encoders);
    
            $result = $serializer->serialize($requests, 'json');
    
            $response = array(
                'code' => 200,
                'message' => 'Successfull!',
                'errors' => null,
                'result' => json_decode($result)
            );
            return new JsonResponse($response, 200);    
        }
    }
    

    // User views requests
    /**
     * @Route("/api/requests", name="get_requests", methods={"GET"})
     */
    public function getRequests(RequestRepository $requestRepository)
    {
        $requests = $this->getUser()->getRequests();
        // Check if requests exists
        if(empty($requests)){
            $response = array(
                'code' => 404,
                'errors' => 'No requests found!',
                'result' => null
            );
            return new JsonResponse($response, 404);  
        }

        // handling circular reference error and ignoring attributes
        $defaultContext = [
            AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function($object, $format, $context)
            {
                return $object->getType();
            },
            AbstractNormalizer::IGNORED_ATTRIBUTES => ["createdAt", "joinedAt"]
        ];
        $encoders = [new JsonEncoder()];
        $normalizers = [new ObjectNormalizer(null, null, null, null, null, null, $defaultContext)];
        $serializer = new Serializer($normalizers, $encoders);

        $result = $serializer->serialize($requests, 'json');

        $response = array(
            'code' => 200,
            'errors' => null,
            'result' => json_decode($result)
        );
        return new JsonResponse($response, 200);    
    }    

    // admin views users request
    /**
     * @Route("/api/admin/request/{id}", name="get_request", methods={"GET"})
     */
    public function getRequest($id, RequestRepository $requestRepository)
    {
        $roles = $this->getUser()->getRoles();
        
        // Check if current user is admin
        if(in_array('ROLE_ADMIN', $roles)){ 
            $request = $requestRepository->find($id);
            if(empty($request))
            {
                $response = array(
                    'code' => 404,
                    'errors' => 'Request not found',
                    'result' => null
                );
                return new JsonResponse($response, 404);
            }

            $defaultContext = [
                AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function($object, $format, $context)
                {
                    return $object->getType();
                },
                AbstractNormalizer::IGNORED_ATTRIBUTES => ["createdAt", "joinedAt"]
            ];
            $encoders = [new JsonEncoder()];
            $normalizers = [new ObjectNormalizer(null, null, null, null, null, null, $defaultContext)];
            $serializer = new Serializer($normalizers, $encoders);
           
    
            $result = $serializer->serialize($request, 'json');
            $response = array(
                'code' => 200,
                'message' => 'Successfull!',
                'errors' => null,
                'result' => json_decode($result)
            );
            return new JsonResponse($response, 200);
        }
    }

    // Make request
     /**
    * @Route("/api/requests", name="make_request", methods={"POST"})
    */
    public function makeRequest(Request $request, SerializerInterface $serializer){
        $em = $this->getDoctrine()
                         ->getManager();
        
        $parameters = json_decode($request->getContent(), true);
       
        $requestType = $parameters['type'];
        $message = $parameters['message'];

        $request = new UserRequest();

        $request->setType($requestType);
        $request->setMessage($message);
        $request->setCreatedAt(new \DateTimeImmutable("NOW"));
        $request->setStatus('pending');
        
        $request->setUser($this->getUser());

        $em->persist($request);
        $em->flush();
        $response = array(
            'code' => 200,
            'errors' => null,
            'result' => null
        );
        return new JsonResponse($response, 200); 
    }

    // Delete request
     /**
    * @Route("/api/requests/{id}", name="delete_request", methods={"DELETE"})
    */
    public function deleteRequest($id, SerializerInterface $serializer){
       $request = $this->getDoctrine()->getRepository(UserRequest::class)->find($id);
        if(empty($request)){
             $response = array(
                 'code' => 404,
                 'errors' => 'No request found!',
                 'result' => null
             );
             return new JsonResponse($response, 404);  
        }
        $em = $this->getDoctrine()
                         ->getManager();
       
        $em->remove($request);
        $em->flush();
        $response = array(
            'code' => 200,
            'message' => 'Request deleted',
            'errors' => null,
            'result' => null
        );
        return new JsonResponse($response, 200); 
    }
}
