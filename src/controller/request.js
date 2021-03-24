// create a search endpoint, save candidate details in the db, return search result,
// if multiple user found, return the message multiple users found and save in the db
// deduct from token for every successful requests, and count the number of requests, add request date and status for report sake
// create add token endpoint to add more token
import { uuid } from 'uuidv4';
import User from '../models/User';
import Report from '../models/Report';
import { checkNetwork } from '../util/checkNetwork';

const baseURL = '';
//return user history endpoint
export default class RequestController {
/**
     * @method
     * @description Implements searchCandidate endpoint
     * @static
     * @param {object} req - String
     * @param {object} res - Response object
     * @returns {object} JSON response
     * @memberof RequestController
     */
static async searchCandidate(req, res) {
  try{
  const {phoneNumber} = req.query;
  const userId = req.user.id;
  const user = await User.findOne({_id: userId})
  if(user.token >= 1){
    if(phoneNumber){
      const networkProvider = checkNetwork(phoneNumber);
    const addPhoneNumberPrefix = phoneNumber.replace('0', '234');
    const url  =  `"http://10.0.0.65:9960/lookup?op=basic-info&msisdn=${addPhoneNumberPrefix}&network=${networkProvider}`;
    const headers = {
      ' api-key': 'TaoPv/d8bFH/tuCVzE322Q=='
  }
  
  const response = await axios.get(url, {headers});
  const respToJson = await response.json();
  const userReport = await Report.findOne({userId: userId});
  const oldnumberOfRequests = userReport.numberOfRequests
  const newNumberOfRequests = oldnumberOfRequests + 1;
  let d = new Date();
  let n = d.toISOString();

  if(respToJson.status == 200){
  oldToken = user.token;
  newToken = oldToken - 1;
  user.token = newToken;
  await user.save(); 
  //report here
      await Report.findOneAndUpdate({userId: userId},
  {
    numberOfRequests: newNumberOfRequests,
    $push :{
            requests : {
                        requestStatus: 'successful',
                        requestId: uuid(),
                        Date: n
                      }
        }
  });
    return res.status(200).send({
    message: "success",
    data: respToJson.data
  })
  } else {
    oldToken = user.token;
    newToken = oldToken - 1;
    user.token = newToken;
    await user.save(); 
    await Report.findOneAndUpdate({userId: userId},
      {
        numberOfRequests: newNumberOfRequests,
        $push :{
                requests : {
                            requestStatus: 'failed',
                            requestId: uuid(),
                            Date: n
                          }
            }
      });
    return res.status(200).send({
      message: "request not successful",
      data: respToJson
    })
  }
    } else {
      return res.status(400).send({
        message: "phone number should not be empty",
        data: null
      })
    }
  } else {
    return res.status(403).send({
      message: "Token is too low",
      data: null
    })
  }
 
} catch(e){
  return res.status(500).send({
    message: "internal server error",
    data: null
  })
}

};

/**
     * @method
     * @description Implements returnUserRequestHistory endpoint
     * @static
     * @param {object} req - String
     * @param {object} res - Response Object
     * @returns {object} JSON response
     * @memberof RequestController
     */
 static async returnUserRequestHistory(req, res) {
   try{
    const userId = req.user.id;
    const report = await Report.findOne({userId: userId});
    if(report){
      return res.status(200).send({
        message: "success",
        data: {
          numberOfRequests: report.numberOfRequests,
          requests: report.requests
        }
      })
    }else{
      return res.status(404).send({
        message: "history not found",
        data: null
      })
    }
   } catch(e){
    return res.status(500).send({
      message: "internal server error",
      data: null
    })
   }

 }


}
