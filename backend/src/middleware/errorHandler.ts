import { Response, Request, NextFunction } from "express";
import { z } from "zod";
import { BAD_REQUEST } from "../constant/http";

// Function to handle Zod validation errors
const handleZodError = (res: Response, error: z.ZodError) => {
    const errors = error.issues.map((err) => ({
        path: err.path.join("."),
        message: err.message,
    }));

    res.status(BAD_REQUEST).json({
        message: "Validation Error",
        errors,
    });
};

// Error handling middleware with explicit typing
const errorHandler = (
    error: unknown, // Use 'unknown' for better type safety
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.log(`PATH: ${req.path}`, error);

    if (error instanceof z.ZodError) {
        handleZodError(res, error);
        return; // Explicitly return to match `void` type
    }

    res.status(500).send("Internal server error");
};

export default errorHandler;
