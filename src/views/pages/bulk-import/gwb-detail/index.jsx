import Loader from "@/components/loader";
import apiWBDClient from "@/utils/apiWBDClient";
import { handleExport, showToast } from "@/utils/helper";
import { responseData } from "@/utils/message";
import { Button, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useState } from "react";

const GWBUpload = () => {
    const [fileInput, setFileInput] = useState('');
    const [apiErrors, setApiErrors] = useState({});
    const [isButtonLoading, setIsButtonLoading] = useState(false);
    const gwbExcelApiUrl = '/water-body-details/gwb/bulk-download';

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileType = file.type;
            const validExcelTypes = [
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'application/vnd.ms-excel'
            ];
            if (!validExcelTypes.includes(fileType)) {
                setApiErrors({ fileError: responseData.fileValMsg });
            } else {
                setApiErrors({});
                setFileInput(file);
            }

        }
    };
    const handleGWBSubmit = async (e) => {
        e.preventDefault();
        setApiErrors({});
        if (!fileInput) {
            setApiErrors({ fileError: responseData.fileReq });
            return;
        };
        if (!fileInput.name || fileInput.size === 0) {
            setApiErrors({ fileError: responseData.fileValMsg });
            return;
        };
        setIsButtonLoading(true);
        const formData = new FormData();
        formData.append("file", fileInput);
        const response = await apiWBDClient.post('/water-body-details/gwb/bulk-import', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (response.data.result) {
            showToast(true, response.data.message);
        } else {
            setApiErrors(response.data.message);
        }
        setIsButtonLoading(false);
    }
    return (
        <Card className='h-full'>
            <CardHeader title='GWB' />
            <CardContent>
                <div className='flex flex-col justify-between mb-4'>
                    <div className='flex flex-col items-start'>
                        <form onSubmit={handleGWBSubmit}>
                            <input type="file" className="mb-3" accept=".xlsx, .xls" onChange={handleFileChange} />
                            <div className='flex justify-between'>
                                <Button size="small" variant='contained' type='submit'>{isButtonLoading ? <Loader type="btnLoader" /> : "Upload"}</Button>
                                <div className="flex">
                                    <Button size="small" variant='contained' startIcon={<i className='bx-download' />} onClick={() => handleExport(apiWBDClient, gwbExcelApiUrl, 'GWB')}> Download</Button>
                                </div>
                            </div>
                        </form>
                        {apiErrors?.fileError && <Typography className='text-red-500 mt-2'>{apiErrors?.fileError}</Typography>}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default GWBUpload