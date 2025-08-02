<?php
namespace App\Repository;

use App\Entity\Traffic;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class TrafficRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Traffic::class);
    }

    public function transform(Traffic $trafficInstance): array
    {
        return $this->mapTrafficFields($trafficInstance);
    }

    private function mapTrafficFields(Traffic $trafficInstance): array
    {
        return array_map(function ($getter) use ($trafficInstance) {
            return $trafficInstance->$getter();
        }, Traffic::getTrafficFieldMappings());
    }

    public function transformAll(): array
    {
        $allTraffic = $this->findAll();
        return $this->transformCollection($allTraffic);
    }

    private function transformCollection(array $trafficCollection): array
    {
        return array_map([$this, 'transform'], $trafficCollection);
    }

    public function findAll(): array
    {
        return $this->findBy(array(), array('id' => 'DESC'));
    }

    public function getTraffic(string $startTime, string $endTime): array
    {
        $qb = $this->createQueryBuilder('t')
            ->where('t.visit_time BETWEEN :startTime AND :endTime')
            ->setParameter('startTime', $startTime)
            ->setParameter('endTime', $endTime);

        $results = $qb->getQuery()->getResult();
        return $this->transformCollection($results);
    }

}
