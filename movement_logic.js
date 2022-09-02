


const checkChannelMemberMovement = async () => {

    //Get latest version of the ticket.
    TICKET = await client.get('ticket');
    const ticketRequesterId = TICKET.ticket.requester.id;

    let membersToRemove = [];
    let membersToAdd = [];

    // Check if the newly saved ticket is being assigned to a user agent. 
    let currentTicketAssigneeId = TICKET.ticket.assignee.user ? TICKET.ticket.assignee.user.id : "z-queue";

    const currentChannelMembers = CHANNEL.data.members

    //User to remove from the channel
    for (let i = 0; i < currentChannelMembers.length; i++) {
        //Exclude removal of the requester
        if (currentChannelMembers[i].user_id == ticketRequesterId) continue;
        //Detect if ticket was saved with no change in owner.
        if (currentChannelMembers[i].user_id == currentTicketAssigneeId) continue;
        //Remove all other members
        membersToRemove.push(currentChannelMembers[i].user_id);
    }

    //Users to add to the channel 
    if (currentTicketAssigneeId != "z-queue") membersToAdd = [currentTicketAssigneeId]
    for (let i = 0; i < currentChannelMembers.length; i++) {
        (currentChannelMembers[i].user_id == currentTicketAssigneeId) ? membersToAdd = [] : ""
    }

    return { membersToAdd, membersToRemove}
}