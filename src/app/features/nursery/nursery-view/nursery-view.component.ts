import { Component, OnInit } from '@angular/core';
import { NurseryListComponent } from '../nursery-list/nursery-list.component';
import { Nursery } from '../../../shared/interfaces/nursery.interface';
import { NurseryService } from '../nursery.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PaginatedItems } from '../../../shared/interfaces/paginated-items.interface';
import { PaginatorModule } from 'primeng/paginator';
import { PageEvent } from '../../../shared/interfaces/page-event.interface';
import { ButtonModule } from 'primeng/button';
import { EmptyComponent } from '../../../shared/empty/empty.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
@Component({
    selector: 'mn-nursery-view',
    standalone: true,
    imports: [NurseryListComponent, PaginatorModule, RouterLink, ButtonModule, EmptyComponent, NgxSkeletonLoaderModule],
    templateUrl: './nursery-view.component.html',
    styleUrl: './nursery-view.component.scss',
})
export class NurseryViewComponent implements OnInit {
    nurseries: Nursery[] = [];
    filteredNurseries: Nursery[] = [];
    totalCount: number = 0;
    first: number = 0;
    rows: number = 12;
    skeletonNumbers = Array.from({ length: 12 }, (_, i) => i + 1);

    constructor(private nurseryService: NurseryService) {}

    ngOnInit(): void {
        this.generatePage(this.first, this.rows);
    }

    // Affiche une page sur base de son index
    generatePage(pageNumber: number, offset: number) {
        this.nurseryService.getPaginatedItems(pageNumber, offset).subscribe({
            next: (data: PaginatedItems) => {
                this.nurseries = data.items;
                this.totalCount = data.totalCount;
            },
        });
    }

    onPageChange(event: PageEvent) {
        this.first = event.first;
        this.rows = event.rows;
        this.generatePage(event.page, this.rows);
    }
}
