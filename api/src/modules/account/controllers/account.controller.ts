import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AccountService } from "../services/account.service";
import { AccountEntity } from "../entities/account.entity";
import { ResultsMetadata } from "src/common/models/results-metadata.model";
import { FindAccountDto } from "../dto/find-account";


@UseInterceptors(ClassSerializerInterceptor)
// @UseGuards(OrganizationAdminAuthGuard)
@ApiBearerAuth()
@ApiTags('accounts')
@Controller('accounts')
export class AccountController {
	constructor(private readonly accountService: AccountService) { }

	@Get()
	// @UseGuards(ChurchAdminAuthGuard)
	@ApiOkResponse({
		type: () => ({
			data: [AccountEntity],
			meta: ResultsMetadata,
		}),
	})
	async find(@Query() dto: FindAccountDto): Promise<{
		data: AccountEntity[];
		meta: ResultsMetadata;
	}> {
		// const branches = await this.accountService.findAllAcounts(dto);
		// return { data: branches, meta: new ResultsMetadata() };
		return this.accountService.find()
	}

	@Get(':id')
	@ApiOkResponse({ type: AccountEntity })
	findOne(@Param('id') id: string): Promise<AccountEntity> {
		return this.accountService.findOneAccount(id);
	}
}