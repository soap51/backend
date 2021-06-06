import { Request, Response } from "express";
import { createProfile, getProfile, updateProfile } from "../../services";
import { auth } from "../../services/auth";

export const getProfileById = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      message: "ID is invalid",
    });
  }
  try{
    const profile = await getProfile({ id });
    if (profile) {
      return res.status(200).json({
        ...profile,
      });
    }
    return res.status(400).json({
      message: "User not found",
    });
  }catch(err){
      return res.status(500).json({
         message: 'Internal Server error'
      })
  }
 
};

export const register = async (req: Request, res: Response) => {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  if (!email || !name || !password) {
    return res.status(400).json({
      message: "credential data is invalid",
    });
  }

  try {
    const result = await createProfile({
      email,
      name,
      password,
    });
    
    return res.status(200).json({      
      ...result
    });
  } catch (err) {
      return res.status(500).json({
          message: 'Internal Server error'
      })
  }
};

export const login = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res.status(400).json({
      message: "credential data is invalid",
    });
  }
  try{
    const result = await auth({
        email,
        password
    })
    if(result){
        return res.status(200).json({
            ...result
        })
    }
    return res.status(400).json({
        message: 'Failed to auth'
    })
    
  }catch(err){
    return res.status(500).json({
        message: 'Internal Server error'
    })
  }
 
};

export const updateProfileById = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      message: "ID is invalid",
    });
  }
  try{
    const name = req.body["name"];
    const profile = await updateProfile({ id, name });
    if (profile) {
      return res.status(200).json({
        ...profile,
      });
    }
    return res.status(400).json({
      message: "User not found",
    });
  }catch(err){
    return res.status(500).json({
        message: 'Internal Server error'
      });
  }
  
};