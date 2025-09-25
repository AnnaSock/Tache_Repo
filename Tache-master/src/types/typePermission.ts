import { TypePermission } from "@prisma/client"

export type typeCreatePerm={
        connectId: number
        utilisateurId: number,
        tacheId: number,
        typePermission: TypePermission 
}

