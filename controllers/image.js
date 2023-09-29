const clarifaiRequestOption = (imageUrl) => {
    const PAT = '6982e30b2c0042db811ef8657c3c312b';
    const USER_ID = 'c1z3v00fdmjx';       
    const APP_ID = 'my-first-application-qqjot';
    const IMAGE_URL = imageUrl;
  
    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
    });
    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
    };
  
    return requestOptions;
  }

const handleApiCall = (req, res) => {
    fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", clarifaiRequestOption(req.body.input))
    .then(data => data.json())
    .then(data => res.json(data))
    .catch(err => res.status(400).json("API error: ", err))
}


const handleImageRequest = (req, res, db) => {
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries)
    })
    .catch(err => res.status(400).json('unable to get entries'));
}

module.exports = {
    handleImageRequest: handleImageRequest,
    handleApiCall: handleApiCall
}