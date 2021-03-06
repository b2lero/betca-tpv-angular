import {Component} from '@angular/core';
import {ArticleFamilyViewService} from './articles-families-view.service';
import {ArticleFamilyViewElement} from './article-family-view-element.model';
import {ArticlesFamilyViewSizesDialogComponent} from './articles-family-view-dialog/articles-family-view-sizes-dialog.component';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ShoppingCartService} from '../shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-articles-family-view',
  templateUrl: 'articles-family-view.component.html',
  styleUrls: ['articles-family-view.component.css']
})

export class ArticlesFamilyViewComponent {

  articlesFamilyList: ArticleFamilyViewElement[] = [];
  ArticlesFamilyViewDefaultComposite = 'root';

  navigationFamilyTypes: string[] = [];
  familyArticleSizesStock: ArticleFamilyViewElement[] = [];

  constructor(private articlesFamilyViewService: ArticleFamilyViewService, private dialog: MatDialog, private shoppingCartService: ShoppingCartService) {
    this.navigationFamilyTypes.push(this.ArticlesFamilyViewDefaultComposite);
    this.articlesFamilyViewService.readFamilyCompositeByDesc(this.ArticlesFamilyViewDefaultComposite)
      .subscribe(
        data => {
          this.articlesFamilyList = data;
        }
      );
  }

  showSizes(articleInfoSizes: ArticleFamilyViewElement[]) {
    const infoSizes = [];
    let dialogConfig: MatDialogConfig;
    articleInfoSizes.forEach(
      e => {
        infoSizes.push({ code: e.code, stock: e.stock, size: e.size });
      }
    );
    dialogConfig = {data: infoSizes};
    this.dialog.open(ArticlesFamilyViewSizesDialogComponent, dialogConfig);
  }

  addArticleShoppingCart(code: string) {
    return this.shoppingCartService.add(code).subscribe((data) => {
      }
    );
  }

  readFamilyArticlesList(description: string) {
    if (!this.navigationFamilyTypes.find(e => e === description)) {
      this.navigationFamilyTypes.push(description);
    }
    this.updateNavigationFamilyTypes(description);
    this.articlesFamilyViewService.readFamilyCompositeByDesc(description)
      .subscribe(
        data => {
          if (data.find(e => e.size !== null && e.stock !== null)) {
            this.familyArticleSizesStock = data;
            this.showSizes(this.familyArticleSizesStock);
          } else {
            this.articlesFamilyList = data;
          }
        }
      );
  }

  updateNavigationFamilyTypes(description: string) {
    const familyNames: string[] = this.navigationFamilyTypes;

    for (let i = 0; i < familyNames.length; i++) {
      if (familyNames[i] ===  description) {
        this.navigationFamilyTypes = familyNames.slice(0, i + 1);
      }
    }
  }

  handleFamilyTypeArticlesFamily(familyType: string, articleItem: ArticleFamilyViewElement) {
    switch (familyType) {
      case 'ARTICLE': {
        this.addArticleShoppingCart(articleItem.code);
        break;
      }
      case 'ARTICLES':
      case 'SIZES':
        this.readFamilyArticlesList(articleItem.description);
        break;
    }
  }

}
