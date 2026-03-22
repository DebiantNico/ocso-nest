import { applyDecorators, UseGuards } from "@nestjs/common";
import { Roles } from "./roles.decorators";
import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/roles.guard";
import { ROLES } from "../constants/roles.constants";

export function Auth(...roles: ROLES[]) {
  return applyDecorators(
    Roles([ROLES.ADMIN, ...roles] as any), 
    UseGuards(AuthGuard, RolesGuard)
  );
}