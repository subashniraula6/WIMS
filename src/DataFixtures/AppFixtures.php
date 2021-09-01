<?php

namespace App\DataFixtures;

use App\Entity\Role;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    public function __construct(UserPasswordHasherInterface $encoder)
    {
        $this->encoder = $encoder;
    }
    public function load(ObjectManager $manager)
    {
        // $product = new Product();
        // $manager->persist($product);
        $this->loadUser($manager);
    }
    public function loadUser(ObjectManager $manager)
    {
        // $product = new Product();
        // $manager->persist($product);
        $user = new User();
        $user->setEmail('nirajan.panthee@gmail.com');
        $user->setRoles(['ROLE_ADMIN']);
        $user->setFullName('Nirajan Panthee');
        $user->setJoinedAt(new \DateTime('2014-01-01'));
        $user->setCreatedAt(new \DateTimeImmutable('NOW'));
        $user->setPassword($this->encoder->hashPassword($user, 'nirajanpanthee@123'));
        $user->setStatus('active');
        $user->setDesignation('CEO');

        $manager->persist($user);
        $manager->flush();
    }
}
