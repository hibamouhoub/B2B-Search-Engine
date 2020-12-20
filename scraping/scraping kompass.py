from urllib.request import Request, urlopen
from bs4 import BeautifulSoup
import re,json


linkz = []
for i in range(1,11):
    req = Request('https://ma.kompass.com/r/rabat-sale-kenitra/ma_ma10/page-'+str(i)+'/', headers={'User-Agent': 'Mozilla/5.0'})
    webpage = urlopen(req).read()
    soup = BeautifulSoup(webpage, 'html.parser')
    links = soup.findAll('p',{'class':'product-summary'})
    for link in links:
        linkz.append(link.a['href'])
print(len(linkz))

i = 0
companyFinal = '{}'
companyFinal = json.loads(companyFinal)
for link in linkz:
    nature,creationYear,juridicForm,activity,effectif,capital,faxNumber,websiteLink = '','','','','','','',''
    ireq = Request(link, headers={'User-Agent': 'Mozilla/5.0'})
    iwebpage = urlopen(ireq).read()
    isoup = BeautifulSoup(iwebpage, 'html.parser')

    name = isoup.find('div',{'class':'companyCol1 blockNameCompany'}).find('h1').string.replace('\r\n','').strip()

    phoneNumber = isoup.find('a',{'class':'coordonneesItemLink phoneCompany showMobile'}).find('input')['value']
    
    ifaxNumber = isoup.find('span',{'class':'faxNumber'})
    if (ifaxNumber):
        if(ifaxNumber.string):
            faxNumber = ifaxNumber.string.replace('\r\n','').strip()
        
    iwebsiteLink = isoup.find('div',{'class':'listWww'})
    if (iwebsiteLink):
        if (iwebsiteLink.p):
            websiteLink = iwebsiteLink.p.a['href']
        
    contact = '{"phone":"'+phoneNumber+'", "fax":"'+faxNumber+'" , "website":"'+websiteLink+'"}'
    contact = json.loads(contact)

    country = isoup.find('span',{'class':'spRight','itemprop':'addressCountry'}).string
    iaddress = str(isoup.find('p',{'class':'blockAddress'}).find('span',{'class':'spRight'}))
    iaddress = iaddress.replace('<br/>\n','').replace('\r\n\t','').replace(' +','')
    iaddress = re.sub(' +', ' ',iaddress)
    address = re.findall('<span itemprop="streetAddress"> (.*) </span>',iaddress)[0]
    city = re.findall('</span> (.*)</span>',iaddress)[0]
    fullAddress = '{"country":"'+country+'" , "city":"'+city+'" , "address":"'+address+'"}'
    fullAddress = json.loads(fullAddress)

    table = isoup.find('table').findAll('tr')
    for row in table:
        row = str(row).replace('\t','').replace('\r','').replace('\n','')
        iname = re.findall('<th>(.*)</th>',row)[0]
        if(iname == 'Nature'):
            if(len(re.findall('<td>(.*)</td>',row))>0):
                nature = re.findall('<td>(.*)</td>',row)[0]
        if(iname == 'Année de création'):
            if(len(re.findall('<td>(.*)</td>',row))>0):
                creationYear = re.findall('<td>(.*)</td>',row)[0]
        if(iname == 'Forme juridique'):
            if(len(re.findall('<td>(.*)</td>',row))>0):
                juridicForm = re.findall('<td>(.*)</td>',row)[0]
        if(iname == 'Activités(NMA10)'):
            if(len(re.findall('<td>(.*)<div',row))>0):
                activity = re.findall('<td>(.*)<div',row)[0]
        if(iname == 'Capital'):
            if(len(re.findall('<td>(.*)</td>',row))>0):
                capital = str(re.findall('<td>(.*)</td>',row)[0])
                capital = capital.replace('\xa0', '')
        if(iname == 'Effectifs de l’entreprise'):
            if(len(re.findall('<td>(.*)\xa0employés</td>',row))>0):
                effectif = re.findall('<td>(.*)\xa0employés</td>',row)[0]
            
    juridicInfos = '{"nature":"'+nature+'","creationYear":"'+creationYear+'","juridicForm":"'+juridicForm
    juridicInfos += '","activity":"'+activity+'","capital":"'+capital+'","effectif":"'+effectif+'"}'
    juridicInfos = json.loads(juridicInfos) 

    products = []
    iproducts = isoup.findAll('p',{'class':'productName'})
    for iproduct in iproducts:
        iproduct = iproduct.string.replace('\r','').replace('\t','').replace('\n','').strip()
        iproduct = re.sub(' +', ' ',iproduct)
        products.append(iproduct)

    dirigeants = []
    idirigeants = isoup.findAll('div',{'class':'executiveText'})
    for idirigeant in idirigeants:
        thename = str(idirigeant.find('p',{'class':'executiveName'}).string).strip()
        thename = re.sub(' +', ' ',thename)
        thefunctionality = str(idirigeant.find('p',{'class':'executiveFonction'}).string).strip()
        thefunctionality = re.sub(' +', ' ',thefunctionality)
        dirigeant = '{"name":"'+thename+'","funtion":"'+thefunctionality+'"}'
        dirigeant = json.loads(dirigeant)
        dirigeants.append(dirigeant)
    company = '{"name":"'+name+'"}'
    company = json.loads(company)
    company['address'] = fullAddress
    company['contact'] = contact
    company['juridicInfos'] = juridicInfos
    company['products'] = products
    company['dirigeants'] = dirigeants
    companyFinal[i] = company
    i = i+1
    
    
    #with open('data.json', 'a', encoding='utf-8') as f:
    #    json.dump(companyFinal, f, ensure_ascii=False, indent=4)
    #    f.write(",")
    print(company['name'],'a été ajoutée dans le fichier.')

	with open('data.json', 'a', encoding='utf-8') as f:
    json.dump(companyFinal, f, ensure_ascii=False, indent=4)