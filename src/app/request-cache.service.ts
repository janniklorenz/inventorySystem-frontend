import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

const maxAge = 30000;
@Injectable()
export class RequestCacheService {

  cache = new Map();

  clear(pattern: string) {
    console.log("Clear cache with pattern", pattern);
    this.cache.forEach(entry => {
      // TODO pattern ignored for now, missing clear dependencies
      // if (entry.url.includes(pattern)) {
        this.cache.delete(entry.url);
      // }
    });
  }

  checkRequest(req: HttpRequest<any>) {
    return req.method == "GET";
  }

  get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const url = req.urlWithParams;
    const cached = this.cache.get(url);

    if (!cached || !this.checkRequest(req)) {
      return undefined;
    }

    const isExpired = cached.lastRead < (Date.now() - maxAge);
    const expired = isExpired ? 'expired ' : '';
    return cached.response;
  }

  put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    if (!this.checkRequest(req)) {
      return;
    }

    const url = req.url;
    const entry = { url, response, lastRead: Date.now() };
    this.cache.set(url, entry);

    const expired = Date.now() - maxAge;
    this.cache.forEach(expiredEntry => {
      if (expiredEntry.lastRead < expired) {
        this.cache.delete(expiredEntry.url);
      }
    });
  }
}
