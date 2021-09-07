<?php

namespace App\Entity;

use App\Repository\ServicingRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ServicingRepository::class)
 */
class Servicing
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $serviceAt;

    /**
     * @ORM\Column(type="integer")
     */
    private $durationInMonth;

    /**
     * @ORM\OneToOne(targetEntity=Inventory::class, inversedBy="servicing", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $inventory;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getServiceAt(): ?string
    {
        return $this->serviceAt->format('Y-m-d');
    }

    public function setServiceAt(?\DateTime $serviceAt): self
    {
        $this->serviceAt = $serviceAt;

        return $this;
    }

    public function getDurationInMonth(): ?int
    {
        return $this->durationInMonth;
    }

    public function setDurationInMonth(int $durationInMonth): self
    {
        $this->durationInMonth = $durationInMonth;

        return $this;
    }

    public function getInventory(): ?Inventory
    {
        return $this->inventory;
    }

    public function setInventory(Inventory $inventory): self
    {
        $this->inventory = $inventory;

        return $this;
    }
}
