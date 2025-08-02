<?php

namespace App\Controller;

use App\Entity\Traffic;
use App\Repository\TrafficRepository;
use App\Utility\ApiResponseTrait;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class TrafficController extends AbstractController
{
    use ApiResponseTrait;

    #[Route('/all-traffic', methods: ['GET'])]
    public function getAllTraffic(TrafficRepository $trafficRepository): Response
    {
        $allTraffic = $trafficRepository->transformAll();

        return $this->respond($allTraffic);
    }

    #[Route('/new-visit', methods: ['POST'])]
    public function create(Request $request, TrafficRepository $trafficRepository, EntityManagerInterface $em): Response
    {
        $data = json_decode($request->getContent(), true);
        if (!$data || !isset($data['ip_address'], $data['user_agent'], $data['page_url'], $data['session_id'])) {
            return $this->respondValidationError('Missing required fields!');
        }

        $traffic = $this->createTrafficFromData($data);
        $em->persist($traffic);
        $em->flush();

        return $this->respondCreated($trafficRepository->transform($traffic));
    }

    private function createTrafficFromData(array $data): Traffic
    {
        $traffic = new Traffic();
        $traffic->setIpAddress($data['ip_address']);
        $traffic->setUserAgent($data['user_agent']);
        $traffic->setPageUrl($data['page_url']);
        $traffic->setSessionId($data['session_id']);
        $traffic->setVisitTime(new \DateTime());
        return $traffic;
    }
}
