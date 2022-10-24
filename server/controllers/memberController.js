const Member = require('../models/member')

const getMember = async (req, res) => {
    const memberId = req.params.id;

    Member.findById(memberId, (err, member) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({
            success: true,
            member
        });
    });
}

const getAllMembers = async (req, res) => {
    Member.find({}, (err, members)=>{
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({
            success: true,
            membersList: members
        });
    })
}

const addMember = async (req, res) => {
    const newMember = req.body

    Member.create(newMember, (err, member) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({
            success: true,
            newMember: member
        });
    })
}

const updateMember = async (req, res) => {
    const memberId = req.params.id
    const updatedMember = req.body

    Member.findByIdAndUpdate(memberId,updatedMember, (err, member) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({
            success: true,
            updatedMember: member
        });
    })
}

const deleteMember = async (req, res) => {
    const memberId = req.params.id

    Member.findByIdAndDelete(memberId, (err, member) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }

        return res.status(200).json({
            success: true,
            deletedMember: member
        });
    })
}

module.exports = {
    getMember,
    getAllMembers,
    addMember,
    updateMember,
    deleteMember
}
