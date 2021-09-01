<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ServicingController extends AbstractController
{
    /**
     * @Route("/api/admin/servicings", name="get_all_servicing")
     */
    public function getAllServicing()
    {
        
    }
}
