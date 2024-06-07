import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiQuery, ApiTags } from "@nestjs/swagger";
import { TransactionService } from "../services/transaction.service";
import { TransactionEntity } from "../entities/transactions.entity";
import { CreateTransactionDto } from "../dto/create-transaction.dto";
import { FindTransactionDto } from "../dto/find-transaction.dto";

@UseInterceptors(ClassSerializerInterceptor)
// @UseGuards(OrganizationAdminAuthGuard)
@ApiBearerAuth()
@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
	constructor(private readonly transactionService: TransactionService) { }


	@Post()
	@ApiOkResponse({ type: TransactionEntity })
	async create(@Body() createChurchMemberDto: CreateTransactionDto): Promise<TransactionEntity> {
		return this.transactionService.createTransaction(createChurchMemberDto);
	}

	@Get()
	@ApiOkResponse({ type: [TransactionEntity] })
	async findAll(@Query() query: FindTransactionDto): Promise<TransactionEntity[]> {
		return this.transactionService.findAll();
	}

	@Get(':id')
	@ApiOkResponse({ type: TransactionEntity })
	findOne(@Param('id') id: string): Promise<TransactionEntity> {
		return this.transactionService.findOne(id);
	}

	// @Get()
	// @ApiOkResponse({ type: [ChurchMemberEntity] })
	// async findAll(@Query() query: FindChurchMemberDto): Promise<ChurchMemberEntity[]> {
	// 	return this.churchMemberService.findAll();
	// }

	// @Get(':id')
	// @ApiOkResponse({ type: ChurchMemberEntity })
	// findOne(@Param('id') id: string): Promise<ChurchMemberEntity> {
	// 	return this.churchMemberService.findOneMember(id);
	// }

	// @Patch(':id')
	// @ApiOkResponse({ type: ChurchMemberEntity })
	// update(
	// 	@Param('id') id: string,
	// 	@Body() dto: UpdateChurchMemberDto,
	// ): Promise<ChurchMemberEntity> {
	// 	return this.churchMemberService.updateChurchMember(id, dto);
	// }

	// @Delete(':id')
	// @ApiOkResponse({ type: ChurchMemberEntity })
	// remove(@Param('id') id: string): Promise<ChurchMemberEntity> {
	// 	return this.churchMemberService.removeChurchMember(id);
	// }




}