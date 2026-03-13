import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createClient } from "../../redux/action/user";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  TextField,
} from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CreateClient = ({ open, setOpen }) => {
  const { isFetching } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const initialClientState = {
    firstName: "",
    lastName: "",
    username: "",
    phone: "",
    email: "",
  };

  const [clientData, setClientData] = useState(initialClientState);
  const [errors, setErrors] = useState({});

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validate = () => {
    const newErrors = {};
    if (!clientData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!clientData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!clientData.username.trim()) newErrors.username = "Username is required";
    if (!clientData.email.trim()) newErrors.email = "Email is required";
    else if (!isValidEmail(clientData.email)) newErrors.email = "Invalid email address";
    if (!clientData.phone.trim()) newErrors.phone = "Phone is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    dispatch(createClient(clientData, setOpen));
    setClientData(initialClientState);
  };

  const handleChange = (field, value) => {
    setClientData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleClose = () => {
    setOpen(false);
    setClientData(initialClientState);
    setErrors({});
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth="sm"
        maxWidth="sm"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className="flex items-center justify-between">
          <div className="text-sky-400 font-primary">Add New Client</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
            <div className="text-xl flex justify-start items-center gap-2 font-normal">
              <PiNotepad size={23} />
              <span>Client Details</span>
            </div>
            <Divider />
            <table className="mt-4">
              <tbody>
                <tr>
                  <td className="pb-4 text-lg">First Name </td>
                  <td className="pb-4">
                    <TextField
                      size="small"
                      fullWidth
                      value={clientData.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                      error={!!errors.firstName}
                      helperText={errors.firstName || " "}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pb-4 text-lg">Last Name </td>
                  <td className="pb-4">
                    <TextField
                      size="small"
                      fullWidth
                      value={clientData.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      error={!!errors.lastName}
                      helperText={errors.lastName || " "}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pb-4 text-lg">User Name </td>
                  <td className="pb-4">
                    <TextField
                      size="small"
                      fullWidth
                      value={clientData.username}
                      onChange={(e) => handleChange("username", e.target.value)}
                      error={!!errors.username}
                      helperText={errors.username || " "}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pb-4 text-lg">Email </td>
                  <td className="pb-4">
                    <TextField
                      size="small"
                      fullWidth
                      placeholder=""
                      value={clientData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      error={!!errors.email}
                      helperText={errors.email || " "}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="flex items-start pt-2 text-lg">Phone </td>
                  <td className="pb-4">
                    <TextField
                      type="number"
                      size="small"
                      value={clientData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      fullWidth
                      error={!!errors.phone}
                      helperText={errors.phone || " "}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleClose}
            variant="contained"
            type="reset"
            className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            variant="contained"
            className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin">
            {isFetching ? "Submitting..." : "Submit"}
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateClient;
