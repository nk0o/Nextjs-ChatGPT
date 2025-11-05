import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const userTable = pgTable('user_table', {
  //함수체이닝방식으로 컬럼정의
  id: uuid('id').defaultRandom().notNull().primaryKey(),//uuid형식의 문자열.값안넣어도랜덤생성.null불가.기본키
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
 createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const conversationTable = pgTable('conversation_table', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  name: text('name'),
  userId: uuid('user_id').references(() => userTable.id, { onDelete: 'cascade' }).notNull(), //foreign키 설정(참조할테이블.참조할컬럼, {액션설정})
  //foreign키 액션: 부모 테이블 값 변경/삭제시 자식테이블에 미치는 영향 설정 가능
  //기본값: onUpdate: no action, onDelete: no action
  //예: onDelete: cascade -> 부모테이블 행 삭제시 자식테이블 행도 같이 삭제
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// User - Conversation 일대다(One to Many) 관계 테이블
//relations 함수 prams: (테이블, 관계설정콜백함수(관계prams))
export const userRelations = relations(userTable, ({ many }) => ({
	conversationTable: many(conversationTable),
}));

export const conversationRelations = relations(conversationTable, ({ one, many }) => ({
	user: one(userTable, {
    //one 함수로 관계정의
    //one(참조할테이블, {fields:현재테이블의 [foreign키컬럼(들)]
    //foreign키란: 현재테이블에서 다른테이블의 기본키를 참조하는 키(다른테이블 행을 식별할 수 있는키(조합))
    //references: [참조할테이블의 기본키컬럼(들)(보통 primaryKey())]})
		fields: [conversationTable.userId],
		references: [userTable.id],
	}),
	messages: many(messageTable),
}));


export const messageTable = pgTable('message_table', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  content: text('content'),
  role: text('role').$type<'user' | 'assistant'>(), //메세지의 주체를 나타내는 컬럼:타입이 추론되도록,
  conversationId: uuid('conversation_id').references(() => conversationTable.id, { onDelete: 'cascade' }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

//conversation - message 일대다(One to Many) 관계 테이블
export const messageRelations = relations(messageTable, ({ one }) => ({
	user: one(conversationTable, {
		fields: [messageTable.conversationId],
		references: [conversationTable.id],
	}),
}));