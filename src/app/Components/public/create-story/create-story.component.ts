import { ApiService } from 'src/app/Services/api.service';
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { window } from 'rxjs/operators';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-create-story',
  templateUrl: './create-story.component.html',
  styleUrls: ['./create-story.component.css']
})
export class CreateStoryComponent implements OnInit {

  constructor(
    private service: ApiService,
    public fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

  }

  // title:any;
  genre = { "romance": "", "fiction": "", "horror": "", "thriller": "", "scifi": "" };
  // romance:any;
  // fiction:any;
  // horror:any;
  // thriller:any;
  // scifi:any;
  newGenre: any = [];
  // blurb:any;
  // story:any;

  book = new FormGroup({
    title: new FormControl(''),
    romance: new FormControl(''),
    fiction: new FormControl(''),
    horror: new FormControl(''),
    thriller: new FormControl(''),
    scifi: new FormControl(''),
    blurb: new FormControl(''),
    story: new FormControl('')
  })

  getKeys(object: any) {
    // console.log(Object.keys(object).find(key => object[key]==true))
    // let keys = Object.keys(object)
    // for (let index = 0; index < keys.length; index++) {
    //   if(object[index]==true){
    //     this.newGenre.push(keys[index])
    //   }
    // }
    Object.keys(object).forEach(key => {
      if (object[key] == true) {
        this.newGenre.push(key)
      }
    })
    console.log(this.newGenre)
  }
  imageName = "imageIcon.png"
  publish() {
    // let genre = [this.romance, this.fiction, this.horror, this.thriller, this.scifi]
    this.getKeys({"romance":this.book.value.romance,"fiction":this.book.value.fiction,
    "horror":this.book.value.thriller,"scifi":this.book.value.scifi,"thriller":this.book.value.thriller})
    // console.log(this.genre)
    // console.log({"title": this.title, "genre":this.newGenre,"blurb":this.blurb,"storyFlow":this.story});
    // console.log(this.blurb)
    this.service.addStory({"title": this.book.value.title, "genre":this.newGenre,"blurb":this.book.value.blurb,"storyFlow":this.book.value.story,"image":this.imageName})
    .subscribe(res => console.log(res))
    console.log(this.book.value);


  }

  files: any;

  handleFileInput(event: any){
    this.files = event.target.files[0];
    console.log(this.files.name)
    this.imageName = this.files.name
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
};


}
