import { PDFDownloadLink } from '@react-pdf/renderer';
import {BsFiletypePdf} from 'react-icons/bs'
import React from 'react'
import Invoice from './Invoice';

const DownloadInvoice = () => {
    return (
        <div>
            <PDFDownloadLink document={<Invoice />} fileName='order_invoice.pdf'>
                <button className='checkout-btn'><BsFiletypePdf /> Download Invoice</button>
            </PDFDownloadLink>
        </div>
    )
}

export default DownloadInvoice;