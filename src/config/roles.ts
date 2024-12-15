export enum Role {
    Player = "player",
    Admin = "admin",
}

export enum Right {
    Play = "play",
    Manage = "manage",
    GET_USERS = "get_users",
    MANAGE_USERS = "manage_users",
}

export const roleRights: Map<Role, Right[]> = new Map([
    [Role.Player, [Right.Play]],
    [Role.Admin, [Right.Play, Right.Manage]],
]);
