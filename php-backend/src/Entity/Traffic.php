<?php

namespace App\Entity;

use App\Repository\TrafficRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TrafficRepository::class)]
class Traffic
{
    private const TRAFFIC_FIELD_MAPPING = [
        'ip_address' => 'getIpAddress',
        'url' => 'getPageUrl',
        'session_id' => 'getSessionId',
        'user_agent' => 'getUserAgent',
        'time' => 'getVisitTime',
    ];

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 15)]
    private ?string $ip_address = null;

    #[ORM\Column(length: 255)]
    private ?string $page_url = null;

    #[ORM\Column(length: 255)]
    private ?string $session_id = null;

    #[ORM\Column(length: 255)]
    private ?string $user_agent = null;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    private ?\DateTime $visit_time = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getIpAddress(): ?string
    {
        return $this->ip_address;
    }

    public function setIpAddress(string $ip_address): static
    {
        $this->ip_address = $ip_address;

        return $this;
    }

    public function getPageUrl(): ?string
    {
        return $this->page_url;
    }

    public function setPageUrl(string $page_url): static
    {
        $this->page_url = $page_url;

        return $this;
    }

    public function getSessionId(): ?string
    {
        return $this->session_id;
    }

    public function setSessionId(string $session_id): static
    {
        $this->session_id = $session_id;

        return $this;
    }

    public function getUserAgent(): ?string
    {
        return $this->user_agent;
    }

    public function setUserAgent(string $user_agent): static
    {
        $this->user_agent = $user_agent;

        return $this;
    }

    public function getVisitTime(): ?\DateTime
    {
        return $this->visit_time;
    }

    public function setVisitTime(\DateTime $visit_time): static
    {
        $this->visit_time = $visit_time;

        return $this;
    }

    public static function getTrafficFieldMappings(): array
    {
        return self::TRAFFIC_FIELD_MAPPING;
    }
}
