import {getChannelMembers, changeChannelMembers } from './api.js'

export async function checkChannelMemberMovement(TICKET) {
   
    const ticketRequesterId = TICKET.requester_id;
  
    let membersToRemove = [];
    let membersToAdd = [];
  
    // Check if the newly saved ticket is being assigned to a user agent. 
    let currentTicketAssigneeId = TICKET.assignee_name !== ''? TICKET.assignee_id : "z-queue";
    //Get channel members. 

    const channelMembers =  await getChannelMembers(`zendesk-${TICKET.ticket_id}`)
    if(channelMembers.error) return channelMembers
    //User to remove from the channel
    for (let i = 0; i < channelMembers.members.length; i++) {
        //Exclude removal of the requester
        if (channelMembers.members[i].user_id == ticketRequesterId) continue;
        //Detect if ticket was saved with no change in owner.
        if (channelMembers.members[i].user_id == currentTicketAssigneeId) continue;
        //Remove all other members
        membersToRemove.push(channelMembers.members[i].user_id);
    }
  
    //Users to add to the channel 
    if (currentTicketAssigneeId != "z-queue") membersToAdd = [currentTicketAssigneeId]
    for (let i = 0; i < channelMembers.length; i++) {
        (channelMembers[i].user_id == currentTicketAssigneeId) ? membersToAdd = [] : ""
    }
    return { membersToAdd, membersToRemove}
  }


  export async function updateChannelMembership(channelUrl, data){
    const result = {}
    if (data.membersToAdd.length > 0) result["added"] = await changeChannelMembers(channelUrl, data.membersToAdd, 'invite', 'post')
    if (data.membersToRemove.length > 0) result["removed"] = await changeChannelMembers(channelUrl, data.membersToRemove, 'leave', 'put')
    return result
}