// Variables 
const fileUploadEl = document.querySelector('#fileupload');
const attachedUpload = document.querySelector('.attached-image-list');

function formateFileSize(bytes){
    const kilobyte = 1024;
    const megabyte = kilobyte * 1024;

    if(bytes < kilobyte){
        return bytes + ' bytes';
    } else if (bytes < megabyte) {
        return (bytes / kilobyte).toFixed(2) + ' KB';
    } else {
        return (bytes / megabyte).toFixed(2) + ' MG';
    }
}


fileUploadEl.addEventListener("change", handleFiles, false);

function handleFiles(){
    const fileList = fileUploadEl.files;
    for(const imgData of fileList) {
        const imgName = imgData.name.split('-').filter((word, idx) => idx < 3).join(' ');

        const imgSize = imgData.size;
        const formattedSize = formateFileSize(imgSize);

        const imgDate = new Date(imgData.lastModifiedDate);
        const formattedDate = imgDate.toLocaleString("en-US", {
            day: "numeric",
            month: "short",
            weekday: "short",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true
        })

        const imgType = imgData.type.split('/').filter((word, idx, arr) => idx === arr.length - 1).join('').toUpperCase();

        const imgSrc = URL.createObjectURL(imgData);

        console.log(imgType)
        // console.log(imgData)
        
        // Create the HTML string
        const htmlString = `
        <!-- Image Content Area -->
        <main class="image-content-area">
            <article class="image-track-container">
                <section class="track track-1">
                    <div class="image-wrapper">
                        <img src="${imgSrc}" alt="">
                    </div>

                    <div class="image-details-container">
                        <h2 class="file-name">${imgName} ...</h2>
                        <div>
                            <i class="fa-solid fa-file-image"></i>
                            <em class="file-size">${formattedSize}</em> |
                            <em class="demension">${imgType}</em> |
                            <em class="date">${formattedDate}</em>
                        </div>
                    </div>

                    <!-- File controls -->
                    <div class="file-controls">
                        <i class="fa-solid fa-file-import"></i>
                        <i class="fa-solid fa-share-from-square"></i>
                        <i class="fa-solid fa-trash-can"></i>
                        <span>
                            <input type="checkbox" name="checkbox" id="checkbox">
                        </span>
                    </div>

                </section>
            </article>
        </main>`;

        // Insert the HTML string as the first child of attachedUpload
        attachedUpload.innerHTML = htmlString + attachedUpload.innerHTML;

        const imgEl = document.querySelectorAll('.image-wrapper img')
       
        // console.log(imgEl)
        // imgEl.forEach((element) => {
        //     element.onload = ()=> {
        //         URL.revokeObjectURL(imgSrc);
        //     }
        // })

        
        // The font-awesome trash icon as the delete icon
        const shareButton = document.querySelectorAll('.file-controls .fa-share-from-square');
        const deleteButton = document.querySelectorAll('.file-controls .fa-trash-can');

        shareButton.forEach((button)=>{
            button.addEventListener('click', ()=> {
                const shareModel = document.querySelector('#shareModel');
                const cancelModel = document.querySelector('.share-btn');
                const overlay = document.querySelector('.overlay');

                shareModel.style.display = 'flex';
                overlay.style.display = 'block';

                cancelModel.addEventListener('click', ()=> {
                    shareModel.style.display = 'none';
                    overlay.style.display = 'none';
                })
            })
        })

        deleteButton.forEach((item)=>{
            item.addEventListener('click', (e)=>{
                deleteElementCard(attachedUpload, [e.target.closest('.image-content-area')]);
            })
        });

    }
}

function deleteElementCard(parent, child){
    child.forEach((element) => {
        parent.removeChild(element);
    });
}

