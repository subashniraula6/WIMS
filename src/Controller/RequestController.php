<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Request as UserRequest;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;

class RequestController extends AbstractController
{
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
