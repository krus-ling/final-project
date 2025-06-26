import './UploadedFileCard.css';
import { X } from 'lucide-react'; // или можно просто использовать обычный svg

const UploadedFileCard = ({ file, onRemove }) => {
    const fileSizeKB = (file.size / 1024).toFixed(0);
    const fileName = file.name.length > 15 ? file.name.slice(0, 12) + '...' : file.name;

    return (
        <div className="file-card">
            <div className="file-icon">📄</div>
            <div className="file-info">
                <span className="file-name">{fileName}</span>
                <span className="file-size">{fileSizeKB} KB</span>
            </div>
            <button className="remove-btn" onClick={onRemove}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>

        </div>
    );
};

export default UploadedFileCard;
