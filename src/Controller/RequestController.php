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

    /**
     * @Route("/api/requests", name="get_requests", methods={"GET"})
     */
    public function getRequests(RequestRepository $requestRepository)
    {
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
        
        $requests = $requestRepository->findAll();

        $result = $serializer->serialize($requests, 'json');

        $response = array(
            'code' => 200,
            'message' => 'Successfull!',
            'errors' => null,
            'result' => json_decode($result)
        );
        return new JsonResponse($response, 200);
    }

    // Make request
     /**
    * @Route("/api/requests", name="make_request", methods={"POSt"})
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
            'message' => 'Request created',
            'errors' => null,
            'result' => null
        );
        return new JsonResponse($response, 200); 
    }

    // Delete request
     /**
    * @Route("/api/requests/{id}", name="delete_request", methods={"DELETE"})
    */
    public function deleteRequest(UserRequest $request, SerializerInterface $serializer){
       
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
