import { Routes } from '@angular/router';
import { AppComponent } from 'app/app.component';
import { DashboardComponent } from "app/components/dashboard/dashboard.component";
import { GalleriesComponent } from "app/components/galleries/galleries.component";
import { SearchComponent } from "app/components/search/search.component";
import { EditPhotoComponent } from "app/components/edit-photo/edit-photo.component";
import { EditGalleryComponent } from "app/components/edit-gallery/edit-gallery.component";

export const routes: Routes = [
    {
        path: '', component: AppComponent
    },
    {
        path: 'galleries', component: GalleriesComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'photo/:id',
        component: EditPhotoComponent
    },
    {
        path: 'search',
        component: SearchComponent
    },
    {
        path: 'gallery/:id',
        component: EditGalleryComponent
    }
]