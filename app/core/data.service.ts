import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { filter, map } from "rxjs/operators";

export interface IDataItem {
    author: string;
    caption?: string;
    date: Date | string;
    description: string;
    id: number;
    image: string;
    liked?: boolean;
    location: string;
    popularity?: string | number;
    title: string;
    viewed?: boolean;
}

@Injectable()
export class DataService {

    private _items$: BehaviorSubject<Array<IDataItem>>;
    private _items = new Array<IDataItem>(
        {
            id: 1,
            image: "https://lh5.googleusercontent.com/p/AF1QipNLjp4fgx1vy5u9tvijdifWRXuoYuvHTdGx4dhj",
            title: "Lincoln Garden",
            author: "",
            location: "",
            description: "",
            date: "",
            popularity: null,
            viewed: false,
            liked: false
        },
        {
            id: 2,
            image: "https://photos.bigoven.com/recipe/hero/ground-beef-tacos-11.jpg",
            title: "Tacos",
            author: "",
            location: "",
            description: "",
            date: "",
            popularity: null,
            viewed: false,
            liked: false
        },
        {
            id: 3,
            image: "https://www.dairyqueen.com/PageFiles/4904/DQ_dotcom_about_us_01.png",
            title: "Dairy Queen",
            author: "",
            location: "",
            description: "",
            date: "",
            popularity: null,
            viewed: false,
            liked: false
        },
        {
            id: 4,
            image: "https://i.insider.com/5a78b23270ca442a008b45c4?width=2500&format=jpeg&auto=webp",
            title: "Dubs",
            author: "",
            location: "",
            description: "",
            date: "",
            popularity: null,
            viewed: false,
            liked: false
        },
        {
            id: 5,
            image: "https://thestayathomechef.com/wp-content/uploads/2019/01/Pot-Roast-1.jpg",
            title: "Pot Roast",
            author: "",
            location: "",
            description: "",
            date: "",
            popularity: null,
            viewed: false,
            liked: false
        },
        {
            id: 6,
            image: "https://makleen.files.wordpress.com/2019/06/chubbys_01.jpg?w=1132",
            title: "Chubby\'s",
            author: "",
            location: "",
            description: "",
            date: "",
            popularity: null,
            viewed: false,
            liked: false
        }


    );

    constructor() {
        this._items$ = new BehaviorSubject<Array<IDataItem>>(this.cloneItems());
    }

    getItems(): Array<IDataItem> {
        return this._items$.getValue();
    }

    getItem(id: number): IDataItem {
        return this._items$.getValue().find((data) => {
            return data.id == id;
        });
    }

    getIndex(item: IDataItem): number {
        return this.getItems().findIndex((element) => element.id === item.id);
    }

    getUnseenItems$(): Observable<Array<IDataItem>> {
        return this._items$.asObservable()
            .pipe(map((items: Array<IDataItem>) => items.filter((item: IDataItem) => !item.viewed)));
    }

    getUnseenItems(): Array<IDataItem> {
        return this._items$.getValue().filter((item: IDataItem) => !item.viewed);
    }

    getLikedItems$(): Observable<Array<IDataItem>> {
        return this._items$.asObservable()
            .pipe(map((items: Array<IDataItem>) => items.filter((item: IDataItem) => item.liked === true)));
    }

    getLikedItems(): Array<IDataItem> {
        return this._items$.getValue().filter((item: IDataItem) => item.liked);
    }

    updateItem(item: IDataItem): void {
        const items = this.getItems();
        items[this.getIndex(item)] = item;
        this._items$.next(items);
    }

    dislike(item: IDataItem): void {
        item.liked = false;
        const items = this.getItems();
        items[this.getIndex(item)] = item;
        this._items$.next(items);
    }

    resetItems(): void {
        this._items$.next(this.cloneItems());
    }

    private cloneItems(): Array<IDataItem> {
        return JSON.parse(JSON.stringify(this._items));
    }
}
