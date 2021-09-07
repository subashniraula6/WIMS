<?php

namespace App\Controller;

use App\Entity\Servicing;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class ServicingController extends AbstractController
{
    /**
     * @Route("/api/admin/servicings", name="get_servicings")
     */
    public function getAllServicing()
    {
        $roles = $this->getUser()->getRoles();
        // Check if current user is admin
        if(in_array('ROLE_ADMIN', $roles)){ 
            $servicings = $this->getDoctrine()
                                ->getRepository(Servicing::class)
                                ->findAll();
            if(empty($servicings)){
                $response = array(
                    'code' => 404,
                    'errors' => 'No Servicing',
                    'result' => null
                );  
                return new JsonResponse($response, 404);  
            }
            $encoders = [new JsonEncoder()];
                $defaultContext = [
                    AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object, $format, $context) {
                        return null;
                    },
                    AbstractNormalizer::ATTRIBUTES => ['id', 'inventory', 'name', 'brand ', 'model', 'status', 'description', 'category', 'user', 'email', 'fullName', 'durationInMonth', 'serviceAt']
                ];
                $normalizers = [new ObjectNormalizer(null, null, null, null, null, null, $defaultContext)];
        
                $serializer = new Serializer($normalizers, $encoders);
                $data = $serializer->serialize($servicings, 'json');
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
}
