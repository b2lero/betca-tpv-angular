import { Component } from '@angular/core';
import { Offer } from './offer.model';
import { ArticleIdentificatorsMock } from './articleIdentificators.mock';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatTableDataSource} from '@angular/material';
import {ArticleService} from '../shared/article.service';
import {Article} from '../shared/article.model';

@Component({
  selector: 'app-offers-create-dialog',
  templateUrl: './offers-create-dialog.component.html'
})
export class OffersCreateDialogComponent {
  title = 'Articles list';
  dataSource: MatTableDataSource<object>;
  displayedColumns = ['id', 'percentage', 'action'];
  offer: Offer;

  formCreateOffer = new FormGroup({
    offername: new FormControl('',
      [Validators.required]),
    endDate: new FormControl(  '',
      [Validators.required]),
  });

  constructor(private articleService: ArticleService) {
    this.dataSource = new MatTableDataSource<object>();
  }

  addArticle() {
    // TODO implement addArticle
    console.log('Add Article');
    const article: object = { id: '7', percentage: 3 }; // TODO Replace this hardcore data for data inputs
    this.articleService.readOne(article.id).subscribe((result) => {
        console.log(result, '<<<<<<<<< ARTICLE FOUNDED');
        this.dataSource.data.push(article);
        this.dataSource = new MatTableDataSource(this.dataSource.data);
      },
      (error) => {
        console.log(error, '<<<<<<<<< ERROR: Article Id not found');
      }
    );
  }

  delete(article: object) {
    this.dataSource.data = this.dataSource.data.filter(h => h !== article);
  }

  createOffer(formSubmited: FormGroup) {
    // TODO implement createOffer
    console.log('<<<<<<<< ENTRA >>>>>>>');
    console.log(this.dataSource.data, '<<<<<< ArticleLine');
    console.log(formSubmited, '<<<<<<<< FORM FIELDS');
  }
}
