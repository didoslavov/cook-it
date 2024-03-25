import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface FileBody extends Blob {
  lastModified: number;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabaseInstance: SupabaseClient;

  constructor() {
    const SUPABASE_URL = environment.supabaseUrl;
    const SUPABASE_KEY = environment.supabaseApiKey;

    this.supabaseInstance = createClient(SUPABASE_URL, SUPABASE_KEY);
  }

  uploadImage(file: FileBody): Observable<string> {
    return from(
      this.supabaseInstance.storage
        .from('images')
        .upload(`/${Date.now()}_${file?.name}`, file, {
          cacheControl: '3600',
          upsert: false,
        })
    ).pipe(
      map(({ data, error }) => {
        if (error) {
          throw new Error(error.message);
        }

        return `${environment.supabaseUrl}${environment.supabaseBucket}${data.path}`;
      })
    );
  }
}
