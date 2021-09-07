<?php

namespace App\Repository;

use App\Entity\AddedBy;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method AddedBy|null find($id, $lockMode = null, $lockVersion = null)
 * @method AddedBy|null findOneBy(array $criteria, array $orderBy = null)
 * @method AddedBy[]    findAll()
 * @method AddedBy[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AddedByRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, AddedBy::class);
    }

    // /**
    //  * @return AddedBy[] Returns an array of AddedBy objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('a.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?AddedBy
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
