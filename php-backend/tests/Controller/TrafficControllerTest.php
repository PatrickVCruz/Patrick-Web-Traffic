<?php

namespace App\Tests\Controller;

use App\Controller\TrafficController;
use App\Entity\Traffic;
use App\Repository\TrafficRepository;
use Doctrine\ORM\EntityManagerInterface;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class TrafficControllerTest extends TestCase
{
    private TrafficRepository $trafficRepository;
    private EntityManagerInterface $entityManager;
    private TrafficController $controller;

    protected function setUp(): void
    {
        $this->trafficRepository = $this->createMock(TrafficRepository::class);
        $this->entityManager = $this->createMock(EntityManagerInterface::class);
        $this->controller = new TrafficController();
    }

    private function createJsonRequest(array $data): Request
    {
        return new Request([], [], [], [], [], [], json_encode($data));
    }

    private function assertResponse(Response $response, int $expectedStatusCode, string $expectedMessage): void
    {
        $this->assertInstanceOf(Response::class, $response);
        $this->assertEquals($expectedStatusCode, $response->getStatusCode());
        $this->assertStringContainsString($expectedMessage, $response->getContent());
    }

    private function assertTrafficMatchesData(Traffic $traffic, array $data): void
    {
        $this->assertSame($data['ip_address'], $traffic->getIpAddress());
        $this->assertSame($data['user_agent'], $traffic->getUserAgent());
        $this->assertSame($data['page_url'], $traffic->getPageUrl());
    }

    public function testGetAllTrafficWithRecords(): void
    {
        $trafficRecords = [
            ['ip_address' => '192.168.1.1', 'page_url' => '/home'],
            ['ip_address' => '192.168.1.2', 'page_url' => '/about']
        ];

        $this->trafficRepository
            ->expects($this->once())
            ->method('transformAll')
            ->willReturn($trafficRecords);

        $response = $this->controller->getAllTraffic($this->trafficRepository);

        $this->assertResponse($response, Response::HTTP_OK, json_encode($trafficRecords));
    }

    public function testGetAllTrafficWithoutRecords(): void
    {
        $this->trafficRepository
            ->expects($this->once())
            ->method('transformAll')
            ->willReturn([]);

        $response = $this->controller->getAllTraffic($this->trafficRepository);

        $this->assertResponse($response, Response::HTTP_OK, '[]');
    }

    public function testCreateWithMissingFields(): void
    {
        $request = $this->createJsonRequest(['ip_address' => '127.0.0.1']);
        $response = $this->controller->create($request, $this->trafficRepository, $this->entityManager);

        $this->assertResponse($response, Response::HTTP_UNPROCESSABLE_ENTITY, 'Missing required fields!');
    }

    public function testCreateSuccessfully(): void
    {
        $trafficData = [
            'ip_address' => '127.0.0.1',
            'user_agent' => 'Mozilla/5.0',
            'visit_time' => (new \DateTime())->format('H:i:s'),
        ];

        $this->trafficRepository
            ->expects($this->once())
            ->method('transform')
            ->with($this->isInstanceOf(Traffic::class))
            ->willReturn($trafficData);

        $this->entityManager
            ->expects($this->once())
            ->method('persist')
            ->with($this->isInstanceOf(Traffic::class));

        $this->entityManager
            ->expects($this->once())
            ->method('flush');

        $request = $this->createJsonRequest($trafficData);
        $response = $this->controller->create($request, $this->trafficRepository, $this->entityManager);

        $this->assertResponse($response, Response::HTTP_CREATED, json_encode($trafficData));

    }

    public function testCreateTrafficFromData(): void
    {
        $data = [
            'ip_address' => '192.168.0.1',
            'user_agent' => 'Test-Agent/1.0',
            'page_url' => '/test-page',
            'session_id' => 'session123'
        ];

        $createTrafficMethod = new \ReflectionMethod(TrafficController::class, 'createTrafficFromData');
        $traffic = $createTrafficMethod->invoke(new TrafficController(), $data);

        $this->assertInstanceOf(Traffic::class, $traffic);
        $this->assertTrafficMatchesData($traffic, $data);
        $this->assertInstanceOf(\DateTime::class, $traffic->getVisitTime());
    }
}
