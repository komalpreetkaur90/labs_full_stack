import { organizationRepository } from "../repositories/organizationRepository"
import { Leader } from "../types/Leader"

export const organizationService = {

  getLeaders(): Leader[] {
    return organizationRepository.getAll()
  },

  createLeader(leader: Leader): Leader {
    return organizationRepository.create(leader)
  }

}