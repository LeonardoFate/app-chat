export const signup = async (req, res) => {
   try {
    const {fullName, username, password, confirmPassword, gender} = req.body;

    if(password !== confirmPassword){
        return res.status(400).json({error:"Password dont match"})
    }

    const user = await User.findOne({username});

    if(user){
        return req.status(400).json({error:"Usuario ya existe"});
    }

    //has ass
    //const hashedPassword = await bcryot.hash(password, 12);

    const bodyProfilePic = `https://avatar.iran.liara.run/public/9?username${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/81?username${username}`;

    const newUser = new User({
        fullName,
        username,
        password,
        gender,
        profilePic: gender ==="male" ? bodyProfilePic : girlProfilePic
    })
    await newUser.save();

    res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic
    })

   } catch (error) {
    console.log("Error al iniciar sesion", error.message)
    res.status(500).json({error:"error servidor"})
   }
}

export const login = (req, res) => {
    res.send("loginUser");
    console.log("loginUser");
}

export const logout = (req, res) => {
    res.send("logoutUser");
    console.log("logoutUser");
}