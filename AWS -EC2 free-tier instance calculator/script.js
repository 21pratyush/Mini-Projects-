const dateInput = document.getElementById('dateInput');
const calculateButton = document.getElementById('calculateButton');
const resultDiv = document.getElementById('result');

//URL's of AWS-service-icons
const services = [
    {
        name: 'EC-2',
        url: 'https://www.ibm.com/content/dam/adobe-cms/instana/media_logo/AWS-EC2.png/_jcr_content/renditions/cq5dam.web.1280.1280.png',
    },
    {
        name: 'EKS',
        url: 'https://www.ibm.com/content/dam/adobe-cms/instana/media_logo/Amazon-EKS-Anywhere-logo.component.complex-narrative-xl.ts=1689365209672.png/content/adobe-cms/us/en/products/instana/supported-technologies/amazon-eks-anywhere/_jcr_content/root/table_of_contents/body/content_section_styled/content-section-body/complex_narrative/logoimage',
    },
    {
        name: 'RDS',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrNSdronTUijJGMwgpJtSYXkDejl7Sto7lJw&usqp=CAU'
    },
    {
        name: 'EBS',
        url: 'https://symbols.getvecta.com/stencil_24/0_amazon-ebs.8ffe51055c.svg',
    },

];

// Function to calculate the AWS Free Tier expiration date
function calculateExpirationDate() {
    if ((dateInput.value === null) || (dateInput.value === '')) {
        return resultDiv.textContent = `Select a date please.`;
    }
    else {
        // Getting the selected date from the input
        const selectedDate = new Date(dateInput.value);

        // Calculating the Free Tier expiration date (12 months from the selected date)
        const expirationDate = new Date(selectedDate);

        expirationDate.setMonth(expirationDate.getMonth() + 12);

        const year = expirationDate.getFullYear();

        //using padStart() method to display two-digit month, can have prefix `0` 
        const month = String(expirationDate.getMonth() + 1).padStart(2, '0');
        const day = String(expirationDate.getDate()).padStart(2, '0');

        // Format the expiration date as dd/mm/yyy
        const formattedExpirationDate = `${day}/${month}/${year}`;


        // Displaying the result
        resultDiv.innerHTML = `Your AWS Free Tier will expire on ${formattedExpirationDate}. <br> Services you will get: <br>
- Amazon Elastic Compute Cloud (Amazon EC2) <img src="${services[0].url}" alt="${services[0].name}" width="40" heigth="40"> 
<br> - Amazon Elastic Kubernetes Service (Amazon EKS)  <img src="${services[1].url}" alt="${services[1].name}" width="40" heigth="40"> 
<br> - Amazon Relational Database Service (Amazon RDS) <img src="${services[2].url}" alt="${services[2].name}" width="40" heigth="40"> 
<br> - Amazon Elastic Block Store (Amazon EBS) <img src="${services[3].url}" alt="${services[3].name}" width="40" heigth="40">`
            ;

    }
}

// event-listener to the Calculate button 
calculateButton.addEventListener('click', calculateExpirationDate);                             