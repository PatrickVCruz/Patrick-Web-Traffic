<?php

namespace App\Utility;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

trait ApiResponseTrait
{
    protected int $statusCode = 200;

    public function getStatusCode(): int
    {
        return $this->statusCode;
    }

    protected function setStatusCode(int $statusCode): self
    {
        $this->statusCode = $statusCode;

        return $this;
    }

    public function respond(array $data, array $headers = []): JsonResponse
    {
        return new JsonResponse($data, $this->getStatusCode(), $headers);
    }

    public function respondWithErrors(string $errors, array $headers = []): JsonResponse
    {
        $data = ['errors' => $errors,];

        return new JsonResponse($data, $this->getStatusCode(), $headers);
    }

    public function respondUnauthorized(string $message = 'Not authorized!'): JsonResponse
    {
        return $this->setStatusCode(Response::HTTP_UNAUTHORIZED)->respondWithErrors($message);
    }

    public function respondValidationError(string $message = 'Validation errors'): JsonResponse
    {
        return $this->setStatusCode(Response::HTTP_UNPROCESSABLE_ENTITY)->respondWithErrors($message);
    }

    public function respondNotFound(string $errorMessage = 'Not found!'): JsonResponse
    {
        return $this->setStatusCode(Response::HTTP_NOT_FOUND)->respondWithErrors($errorMessage);
    }

    public function respondCreated(array $data = []): JsonResponse
    {
        return $this->setStatusCode(Response::HTTP_CREATED)->respond($data);
    }
}
