import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactService } from '../contact.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  constructor(private contactData: ContactService) {

  }
  addContact = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    mobile: new FormControl('')
  })

  @ViewChild(MatPaginator) paginator: MatPaginator;
  collection = {};
  ngOnInit(): void {

    this.contactData.getList().subscribe((result) => {
      console.log("result:", result);
      this.collection = result;
    });
    // this.collection.paginator = this.paginator;
  }
  public name = " ";
  public email = " ";
  public mobile = " ";
  alert: boolean = false;
  // dataSource= new MatPaginator(ele);



  selectedId = "";
  goToPerson(person: any, event) {
    console.log("go to person", person);
    this.selectedId = person.id;
    // this.name = person.name;
    // this.email = person.email;
    // this.mobile = person.mobile;
    this.contactData.getCurrentContact(person.id).subscribe((result) => {
      console.log("clicked result from server@:", result);


      this.addContact = new FormGroup({
        name: new FormControl(result["name"]),
        email: new FormControl(result["email"]),
        mobile: new FormControl(result["mobile"])
      })
    })
  }

  onSubmit() {

    console.log("submit", this.addContact.value);
    // this.contactData.saveContact(this.addContact.value).subscribe((result) => {
    //   console.log("result:", result)
    //   this.alert = true;
    // });
    this.contactData.updateContact(this.selectedId, this.addContact.value).subscribe((result) => {
      console.log("update result:", result);
      this.alert = true;
    });
    this.addContact.reset({});

  }
  closeAlert() {
    this.alert = false;
  }

  searchData(data) {
    console.log("search data:", data);
    this.contactData.search(data).subscribe((result) => {
      console.log("search result:", result);
      this.collection = result;
    })

  }





}
