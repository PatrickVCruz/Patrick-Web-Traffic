<?php

namespace App\Utility;

use Symfony\Component\HttpFoundation\JsonResponse;

trait ApiResponseTrait
{
    private const HTTP_UNAUTHORIZED = 401;
    private const HTTP_UNPROCESSABLE_ENTITY = 422;
    private const HTTP_NOT_FOUND = 404;
    private const HTTP_CREATED = 201;
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
        return $this->setStatusCode(self::HTTP_UNAUTHORIZED)->respondWithErrors($message);
    }

    public function respondValidationError(string $message = 'Validation errors'): JsonResponse
    {
        return $this->setStatusCode(self::HTTP_UNPROCESSABLE_ENTITY)->respondWithErrors($message);
    }

    public function respondNotFound(string $errorMessage = 'Not found!'): JsonResponse
    {
        return $this->setStatusCode(self::HTTP_NOT_FOUND)->respondWithErrors($errorMessage);
    }

    public function respondCreated(array $data = []): JsonResponse
    {
        return $this->setStatusCode(self::HTTP_CREATED)->respond($data);
    }
}
