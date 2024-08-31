import axios from "axios";

export const complier = async (req, res) => {
    try {
        
        const script = req.body.script;
        const language = "nodejs";
        const versionIndex = "6";

        console.log(script);

        const execution_data = {
            clientId: process.env.JDOODLE_CLIENT_ID,
            clientSecret: process.env.JDOODLE_CLIENT_SECRET,
            script: script,
            language: language,
            versionIndex: versionIndex
        }
        
        const response = await axios.post('https://api.jdoodle.com/v1/execute', execution_data);
        res.status(200).json( response.data);

       

    } catch (error) {
        console.log(`Error in complier controller: ${error.message}`);
        res.status(500).json({message: error});
    }
}

export const creditBalance = async (req, res) => {
    try {
        const execution_data = {
            clientId: process.env.JDOODLE_CLIENT_ID,
            clientSecret: process.env.JDOODLE_CLIENT_SECRET
        }
        
        const response = await axios.post('https://api.jdoodle.com/v1/credit-spent', execution_data);
        res.status(200).json( response.data);
    } catch (error) {
        console.log(`Error in creditBalance controller: ${error.message}`);
        res.status(500).json({message: error});
    }
}