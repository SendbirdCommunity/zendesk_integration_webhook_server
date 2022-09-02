import * as dotenv from 'dotenv' 
dotenv.config()
import axios  from "axios";

const SENDBIRD_API_TOKEN  =  process.env.SENDBIRD_API_TOKEN
const SENDBIRD_APP_ID = process.env.SENDBIRD_APP_ID

//Fetch a list of channel members in order to compare which Zendesk agents if any should be removed
export async function getChannelMembers(channelUrl){

    var config = {
      method: 'get',
      url: `https://api-${SENDBIRD_APP_ID}.sendbird.com/v3/group_channels/${channelUrl}?show_member=true`,
      headers: { 
        'Api-Token': SENDBIRD_API_TOKEN, 
        'Content-Type': 'application/json'
      }
    };
    try {
      const result = await axios(config)
      if(result.data.members) return {error:false, members:result.data.members}    
    } catch (e) {
      return {error:true, message:e.message}
    }
  }

export async function changeChannelMembers(channelUrl, userIds, movement, method){

    var config = {
      method: method,
      url: `https://api-${SENDBIRD_APP_ID}.sendbird.com/v3/group_channels/${channelUrl}/${movement}`,
      headers: { 
        'Api-Token': SENDBIRD_API_TOKEN, 
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({user_ids: userIds})
    };
    try {
      const result = await axios(config)
      if(result.data.members) return {error:false, members:result.data.members} 
      return {error:false, members: userIds} 
    } catch (e) {
      return {error:true, message:e.message}
    }
  }

 