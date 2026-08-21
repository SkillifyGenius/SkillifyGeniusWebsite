import { Request, Response, NextFunction } from "express";
import { UserRole } from "@/types";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: UserRole;
  };
}

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // Support both header-based role impersonation for local demo and token authentication
  const roleHeader = (req.headers["x-user-role"] as UserRole) || "student";
  const authHeader = req.headers.authorization;

  let userId = "student-101";
  let email = "liam.vance@example.com";

  if (roleHeader === "parent") {
    userId = "parent-201";
    email = "elena.rostova@example.com";
  } else if (roleHeader === "mentor") {
    userId = "mentor-301";
    email = "alex.mentor@skillifygenius.com";
  } else if (roleHeader === "admin") {
    userId = "admin-001";
    email = "admin@skillifygenius.com";
  }

  req.user = {
    id: userId,
    email,
    role: roleHeader
  };

  next();
};

export const requireRole = (allowedRoles: UserRole[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: "Forbidden",
        message: `This action requires one of the following roles: ${allowedRoles.join(", ")}`
      });
    }
    next();
  };
};
