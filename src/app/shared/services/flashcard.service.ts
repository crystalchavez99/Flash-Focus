import { Injectable } from '@angular/core';
import { Flashcard } from '../flashcard';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/enviroment';

const supabaseUrl = environment.supabaseUrl;
const supabaseKey = environment.supabaseKey;


@Injectable({
  providedIn: 'root'
})
export class FlashcardService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(supabaseUrl,supabaseKey);
  }

  async getFlashcards(userId?: string)  {
    let { data, error } = await this.supabase.from('flashcards').select('*').eq('userId', userId);

    if (error) {
      console.error(error);
    }

    return data;
  }

  async addFlashCard(flashcard: Flashcard){
    let { data, error } = await this.supabase.from('flashcards').insert(flashcard);
    if (error) {
      console.error(error);
    }
    return data;
  }

  async updateFlashCard(flashcard: Flashcard){
    let { data, error } = await this.supabase.from('flashcards').update(flashcard).eq('id', flashcard.id);

    if (error) {
      console.error(error);
    }

    return data;
  }

  async deleteFlashCard(id: string){
    let { data, error } = await this.supabase.from('flashcards').delete().eq('id', id);

    if (error) {
      console.error(error);
    }

    return data;
  }

  async getFlashCardsBySubjectId(subjectId: number){
    const { data, error } = await this.supabase
    .from('flashcards')
    .select('*')
    .eq('subjectId', subjectId)

    if (error) {
      console.error(error);
    }
    return data;
  }
}
