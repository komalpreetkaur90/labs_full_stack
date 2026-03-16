import { leaders } from "../data/organizationData"
import { Leader } from "../types/Leader"

export const organizationRepository = {

  getAll(): Leader[] {
    return leaders
  },

  create(leader: Leader): Leader {
    leaders.push(leader)
    return leader
  }

}
