<?php

namespace App\Controller;

use App\Entity\User;
use DateTime;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\SerializerInterface;

class AuthController extends AbstractController
{
    /**
     * @Route("/register", name="register_user")
     */
    public function register(Request $request, UserPasswordHasherInterface $encoder)
    {
        $em = $this->getDoctrine()->getManager();

        $parameters = json_decode($request->getContent(), true);
        $email = $parameters['email'];
        $password = $parameters['password'];
        $designation = $parameters['designation'];
        $fullName = $parameters['fullName'];

        $user = new User($email);
        $user->setEmail($email);
        $user->setPassword($encoder->hashPassword($user, $password));
        $user->setDesignation($designation);
        $user->setJoinedAt(new DateTime('NOW'));
        $user->setStatus('employee');
        $user->setRoles(['ROLE_USER']);
        $user->setFullName($fullName);

        $em->persist($user);
        $em->flush();

        return new JsonResponse(['message'=> 'user created!']);
    }
    
    public function getTokenUser(UserInterface $user, JWTTokenManagerInterface $JWTManager)
    {
        return new JsonResponse(['token' => $JWTManager->create($user)]);
    }
    
    /**
     * @Route("/api/me", methods={"GET"})
     */
    public function showUser()
    {
        $encoders = [new JsonEncoder()];
        $defaultContext = [
            AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function($object, $format, $context){
                return $object->getId();
            },
            AbstractNormalizer::ATTRIBUTES => ['id', 'email', 'designation', 'joinedAt', 'status', 'fullName', 'roles']
        ];
        $normalizers = [new ObjectNormalizer(null, null, null, null, null, null, $defaultContext)];
        $serializer = new Serializer($normalizers, $encoders);
        $user = $serializer->serialize($this->getUser(), 'json');
        return new JsonResponse(['user' => json_decode($user)]);
    }
}